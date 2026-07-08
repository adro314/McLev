import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { InputField } from '../../components/input-field/input-field';

@Component({
  selector: 'app-login-page',
  imports: [InputField],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  themeService = inject(ThemeService);
}
