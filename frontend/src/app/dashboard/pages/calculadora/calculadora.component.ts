import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    total: 0
  }

  costeAmbiental: number = 0
  calculoRealizado: boolean = false


  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.consumosForm = this.fb.group({
      consumoElectrico: [null, [Validators.min(0)]],
      consumoAgua: [null, [Validators.min(0)]],
      consumoDiesel: [null, [Validators.min(0)]],
      consumoGasolina: [null, [Validators.min(0)]],
      precioCO2: [85, [Validators.required, Validators.min(0)]]
    }, { validators: this.alMenosUnConsumoValidator })

    Object.keys(this.consumosForm.controls).forEach(campo => {
      this.consumosForm.get(campo)?.valueChanges.subscribe(valor => {
        if (typeof valor !== 'number' || valor < 0) {
          this.consumosForm.get(campo)?.setValue(0, { emitEvent: false });
        }
      })
    })
  }


  onSubmit(): void {
    if (this.consumosForm.valid) {
      const { consumoElectrico, consumoAgua, consumoDiesel, consumoGasolina, precioCO2 } = this.consumosForm.value
      console.log('Huella de carbono estimada:', this.consumosForm.value)
      this.costeAmbiental = this.calcularHuella(consumoElectrico, consumoAgua, consumoDiesel, consumoGasolina, precioCO2)
      console.log('Huella de carbono estimada:', this.costeAmbiental)
      console.log('Coste Ambiental', this.costeAmbiental)
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

  calcularHuella(consumoElectrico: number, consumoAgua: number, consumoDiesel: number, consumoGasolina: number, precioCO2: number): number {
    this.huellaCO2.electricidad = (consumoElectrico * 0.233)
    this.huellaCO2.agua = (consumoAgua * 0.001)
    this.huellaCO2.diesel = (consumoDiesel * 2.3)
    this.huellaCO2.gasolina = (consumoGasolina * 2.3)
    this.huellaCO2.total = this.huellaCO2.electricidad + this.huellaCO2.agua + this.huellaCO2.diesel + this.huellaCO2.gasolina
    return Math.round(this.huellaCO2.total * precioCO2 * 100) / 100
  }


  alMenosUnConsumoValidator(control: AbstractControl): ValidationErrors | null {
    const electricidad = control.get('consumoElectrico')?.value;
    const agua = control.get('consumoAgua')?.value;
    const diesel = control.get('consumoDiesel')?.value;
    const gasolina = control.get('consumoGasolina')?.value;

    if (electricidad > 0 || agua > 0 || diesel > 0 || gasolina > 0) {
      return null // válido
    }

    return { ningunConsumo: true } // inválido
  }

}
