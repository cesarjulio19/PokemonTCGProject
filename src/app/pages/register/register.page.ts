import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/auth.model';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { passwordsMatchValidator, passwordValidator } from 'src/app/core/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private authSvc:BaseAuthenticationService,
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: passwordsMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authSvc.signUp(this.registerForm.value).subscribe({
        next: (resp:User) => {
          const userData = {
            ...this.registerForm.value,
            userId: resp.id.toString()
          };
          this.router.navigate(['/home'])
  
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }


  get username(){
    return this.registerForm.controls['username'];
  }

  get email(){
    return this.registerForm.controls['email'];
  }

  get password(){
    return this.registerForm.controls['password'];
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }

}
