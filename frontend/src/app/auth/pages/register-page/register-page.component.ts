import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)


  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', []],
    userName: ['', [Validators.required]],
  });

  register() {
    const { email, name, password, userName, password2, prefix } = this.myForm.value;

    if (!(password === password2)) {
      Swal.fire('Error', 'Las contraseñas no son iguales', 'error')
    }

    else {
      this.authService.register(email, name, password, userName)
        .subscribe({
          next: () => {
            localStorage.removeItem('ultimaRuta')
            this.router.navigate(['/layout']);
          },
          error: (message) => {
            Swal.fire('Error', message, 'error')
          }
        })
    }
  }
}
