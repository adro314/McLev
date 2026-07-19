import { Component, inject, input, QueryList, ViewChildren } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { InputField } from '../../components/input-field/input-field';
import { InputButton } from '../../components/input-button/input-button';
import { UserService } from '../../services/user-service';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [InputField, InputButton,ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  themeService = inject(ThemeService);
  userService = inject(UserService);

  @ViewChildren(InputField)
  inputFields!: QueryList<InputField>;

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  })

  async login(){
    if (this.loginForm.valid){
      if (!(await this.userService.login(this.loginForm.value))){
        
      }
    } else {
      this.inputFields.forEach(f => {
        f.checkErrors();
      })
    }
  }
}
