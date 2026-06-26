import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../services/theme-service';


@Component({
  selector: 'app-menu-button',
  imports: [],
  templateUrl: './menu-button.html',
  styleUrl: './menu-button.css',
})
export class MenuButton {
  themeService = inject(ThemeService);

  name = input.required<string>();
}
