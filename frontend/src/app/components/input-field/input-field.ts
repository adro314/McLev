import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-input-field',
  imports: [],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField {
  themeService = inject(ThemeService);

  name = input.required<string>();
  type = input.required<string>();
}
