import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { MenuService } from '../../services/menu-service';
import { NavigationService } from '../../services/navigation-service';

@Component({
  selector: 'app-heading',
  imports: [],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
})
export class Heading {
  themeService = inject(ThemeService);
  menuService = inject(MenuService);
  navigationService = inject(NavigationService);
  
  
}
