import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  templateUrl: './userInfo.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoPageComponent {

  private authService = inject( AuthService );
  private fb          = inject( FormBuilder );
  public editUser = signal<boolean>(false);
  public user = computed(() => this.authService.currentUser() );

  public myForm: FormGroup = this.fb.group({
    password: ['', [ Validators.minLength(6) ]],
    password2: ['', [ ]],
    userName: ['', []],
  });

  constructor(private router: Router){}

  update() {
    const { password, userName, password2, prefix } = this.myForm.value;

    if(!(password === password2)){
      Swal.fire('Error', 'Las contraseñas no son iguales', 'error' )
    }

    else{
      this.authService.update(password, userName)
        .subscribe({
          next: () => {
            Swal.fire('', 'Información actualizada', 'success')
              .then( ()=> {
                this.changeEdit();
              });
          },
          error: (message) => {
            Swal.fire('Error', message, 'error' )
          }
        })
    }
  }

  onLogout() {
    this.authService.logout();
  }

  changeEdit() {
    this.editUser.set(!this.editUser());
  }

  cancelar(){
    this.router.navigate(['/form'])
  }
}

