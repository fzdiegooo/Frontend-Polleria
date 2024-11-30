import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  formLogin: FormGroup;
  errorCredentials = false;
  constructor(private auth: AuthService, private fb:FormBuilder){
    this.formLogin = this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.formLogin.valid){
      this.auth.login(this.formLogin.value).subscribe(
        (response:any) => {
          console.log(response);
          this.errorCredentials = false;
        },
        (error:any) => {
          console.log(error);
          this.errorCredentials = true
        }
      );
    }else{
      console.log('Formulario no valido');
    }
  }

}
