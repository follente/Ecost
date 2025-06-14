import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CalculadoraService } from '../../services/calculadora.service';
import { SupplyType } from '../../enums/enums';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraPageComponent implements OnInit {

  consumosForm!: FormGroup
  activeTab: number = 0

  huellaCO2 = {
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

  constructor(private fb: FormBuilder, private calculadoraService: CalculadoraService) { }

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

    this.ceroSiNegativo()
  }


  onSubmit(): void {
    if (this.consumosForm.valid) {
      console.log(this.consumosForm.value)
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
    this.huellaCO2.electricidad = (this.consumosForm.value.consumoElectrico * this.obtenerFactorEmision(SupplyType.Electricidad))
    this.huellaCO2.agua = (this.consumosForm.value.consumoAgua * this.obtenerFactorEmision(SupplyType.Agua))
    this.huellaCO2.diesel = (this.consumosForm.value.consumoDiesel * this.obtenerFactorEmision(SupplyType.Gasoleo))
    this.huellaCO2.gasolina = (this.consumosForm.value.consumoGasolina * this.obtenerFactorEmision(SupplyType.Gasolina))
    this.huellaCO2.butano = (this.consumosForm.value.consumoButano * this.obtenerFactorEmision(SupplyType.GasButano))
    this.huellaCO2.gasNatural = (this.consumosForm.value.consumoGasNatural * this.obtenerFactorEmision(SupplyType.GasNatural))

    this.huellaCO2.total = (this.huellaCO2.electricidad + 
                            this.huellaCO2.agua + 
                            this.huellaCO2.diesel + 
                            this.huellaCO2.gasolina +
                            this.huellaCO2.butano + 
                            this.huellaCO2.gasNatural) / 1000

    return Math.round(this.huellaCO2.total * this.consumosForm.value.precioCO2 * 100) / 100
  }

  obtenerFactorEmision(suministro: SupplyType) {
    return this.factoresEmision.find((f: { supply: string; }) => f.supply === suministro).conversionFactor
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

  guardarResultados(){
    
  }


  alMenosUnConsumoValidator(control: AbstractControl): ValidationErrors | null {
    const electricidad = control.get('consumoElectrico')?.value;
    const agua = control.get('consumoAgua')?.value;
    const diesel = control.get('consumoDiesel')?.value;
    const gasolina = control.get('consumoGasolina')?.value;

    if (electricidad > 0 || agua > 0 || diesel > 0 || gasolina > 0) {
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

}
