import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { InputField } from '../../components/input-field/input-field';
import { InputButton } from '../../components/input-button/input-button';
import { ApiService } from '../../services/api-service';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [InputField, InputButton,ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  themeService = inject(ThemeService);
  apiService = inject(ApiService);

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  })

  login(){
    console.log(this.loginForm.value);
  }
}
