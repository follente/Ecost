import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CalculadoraService } from '../../services/calculadora.service';
import { SupplyType } from '../../enums/enums';
import { environment } from 'src/environments/environments';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserService } from '../../services/users.service';
import { HuellaCO2 } from '../../interfaces/huellaCO2.interface';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraPageComponent implements OnInit {

  consumosForm!: FormGroup
  activeTab: number = 0

  huellaCO2: HuellaCO2 = {
    electricidad: 0,
    agua: 0,
    diesel: 0,
    gasolina: 0,
    butano: 0,
    gasNatural: 0,
    total: 0
  }

  precioCO2_2024: number = environment.precioCO2_2024
  factoresEmision: any

  costeAmbiental: number = 0
  calculoRealizado: boolean = false
  calculoGuardado: boolean = false


  categorias = ['Electricidad', 'Agua', 'Diesel', 'Gasolina', 'Butano', 'GasNatural']
  nombreUsuario = ''
  emailUsuario = ''
  fechaActual = new Date()

  constructor(private fb: FormBuilder, private calculadoraService: CalculadoraService, private userService: UserService) { }

  ngOnInit(): void {
    this.obtenerFactoresEmision()

    this.consumosForm = this.fb.group({
      consumoElectrico: [null, [Validators.min(0)]],
      consumoAgua: [null, [Validators.min(0)]],
      consumoDiesel: [null, [Validators.min(0)]],
      consumoGasolina: [null, [Validators.min(0)]],
      consumoButano: [null, [Validators.min(0)]],
      consumoGasNatural: [null, [Validators.min(0)]],
      precioCO2: [this.precioCO2_2024, [Validators.required, Validators.min(0)]]
    }, { validators: this.alMenosUnConsumoValidator })

    this.userService.getUserById(localStorage.getItem('user')!).subscribe((data) => {
      this.nombreUsuario = data.name
      this.emailUsuario = data.email
    })

    this.ceroSiNegativo()
  }


  onSubmit(): void {
    if (this.consumosForm.valid) {
      this.costeAmbiental = this.calcularHuella()
      this.activeTab = 1
      this.calculoRealizado = true
    } else {
      if (this.consumosForm.errors?.['ningunConsumo']!) {
        Swal.fire({
          icon: 'warning',
          title: 'Formulario inválido',
          text: 'Debes rellenar al menos un campo de consumo (valor superior a cero).\n',
          customClass: {
            confirmButton: 'p-button p-button-primary'
          },
          buttonsStyling: false
        })
      }
    }
  }

  calcularHuella(): number {
    this.huellaCO2.electricidad = (this.consumosForm.value.consumoElectrico * this.obtenerFactorEmision(SupplyType.Electricidad).conversionFactor)
    this.huellaCO2.agua = (this.consumosForm.value.consumoAgua * this.obtenerFactorEmision(SupplyType.Agua).conversionFactor)
    this.huellaCO2.diesel = (this.consumosForm.value.consumoDiesel * this.obtenerFactorEmision(SupplyType.Gasoleo).conversionFactor)
    this.huellaCO2.gasolina = (this.consumosForm.value.consumoGasolina * this.obtenerFactorEmision(SupplyType.Gasolina).conversionFactor)
    this.huellaCO2.butano = (this.consumosForm.value.consumoButano * this.obtenerFactorEmision(SupplyType.GasButano).conversionFactor)
    this.huellaCO2.gasNatural = (this.consumosForm.value.consumoGasNatural * this.obtenerFactorEmision(SupplyType.GasNatural).conversionFactor)

    this.huellaCO2.total = (this.huellaCO2.electricidad +
      this.huellaCO2.agua +
      this.huellaCO2.diesel +
      this.huellaCO2.gasolina +
      this.huellaCO2.butano +
      this.huellaCO2.gasNatural) / 1000

    return Math.round(this.huellaCO2.total * this.consumosForm.value.precioCO2 * 100) / 100
  }

  obtenerFactorEmision(suministro: SupplyType) {
    return this.factoresEmision.find((f: { supply: string; }) => f.supply === suministro)
  }

  obtenerFactoresEmision() {
    this.calculadoraService.getConversionFactors().subscribe({
      next: (data) => {
        this.factoresEmision = data
      },
      error: (err) => {
        console.error('Error fetching conversion factors:', err);
      }
    })
  }

  guardarResultados() {
    const entryValues: { tipo: string; valor: number }[] = []
    const conversionFactors: string[] = []

    const fuentes: { tipo: SupplyType; campo: string; nombre: string }[] = [
      { tipo: SupplyType.Electricidad, campo: 'consumoElectrico', nombre: 'electricidad' },
      { tipo: SupplyType.Agua, campo: 'consumoAgua', nombre: 'agua' },
      { tipo: SupplyType.Gasoleo, campo: 'consumoDiesel', nombre: 'diesel' },
      { tipo: SupplyType.Gasolina, campo: 'consumoGasolina', nombre: 'gasolina' },
      { tipo: SupplyType.GasButano, campo: 'consumoButano', nombre: 'butano' },
      { tipo: SupplyType.GasNatural, campo: 'consumoGasNatural', nombre: 'gas natural' },
    ]

    for (const fuente of fuentes) {
      const consumo = this.consumosForm.value[fuente.campo];

      if (consumo === null || consumo === undefined || consumo === 0) continue;

      const factor = this.obtenerFactorEmision(fuente.tipo);

      entryValues.push({ tipo: fuente.nombre, valor: consumo });

      conversionFactors.push(factor._id);
    }

    const body = {
      entryValues,
      result: Math.round(this.huellaCO2.total * this.consumosForm.value.precioCO2 * 100) / 100,
      conversionPrice: this.consumosForm.value.precioCO2,
      conversionFactors,
      user: localStorage.getItem('user') || 'anonimo',
      date: new Date()
    }

    this.calculadoraService.saveResult(body).subscribe({
      next: () => {
        this.calculoGuardado = true
        Swal.fire({
          icon: 'info',
          title: 'Guardado Correctamente',
          text: 'Este calculo de Huella de carbono ha sido guardado correctamente',
          customClass: {
            confirmButton: 'p-button p-button-primary'
          },
          buttonsStyling: false
        })
      },
      error: (err) => {
        console.error('❌ Error al guardar el resultado:', err)
      }
    })
  }

  nuevoCalculo() {
    this.consumosForm.reset();
    this.activeTab = 0
  }


  alMenosUnConsumoValidator(control: AbstractControl): ValidationErrors | null {
    const electricidad = control.get('consumoElectrico')?.value;
    const agua = control.get('consumoAgua')?.value;
    const diesel = control.get('consumoDiesel')?.value;
    const gasolina = control.get('consumoGasolina')?.value;
    const butano = control.get('consumoButano')?.value;
    const gasNatural = control.get('consumoGasNatural')?.value;

    if (electricidad > 0 || agua > 0 || diesel > 0 || gasolina > 0 || butano > 0 || gasNatural > 0) {
      return null
    }

    return { ningunConsumo: true }
  }

  ceroSiNegativo() {
    Object.keys(this.consumosForm.controls).forEach(campo => {
      this.consumosForm.get(campo)?.valueChanges.subscribe(valor => {
        if (typeof valor !== 'number' || valor < 0) {
          this.consumosForm.get(campo)?.setValue(0, { emitEvent: false });
        }
      })
    })
  }

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  generarPDF() {
    const element = this.pdfContent.nativeElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pageWidth, imgHeight);
      pdf.save(`resultado-huella-carbono-${new Date().getTime()}.pdf`);
    })
  }

  exportarResultadosCSV() {
    const encabezados = ['Fecha', 'CO₂ total (tCO2e)', 'Coste Ambiental'];

    const filas = [
      ['2025-06-15', '1.234', '104.52'],
      ['2025-06-14', '0.982', '83.49']
    ];

    const csvContent = [encabezados, ...filas]
      .map(e => e.join(';'))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resultados_ecost.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
