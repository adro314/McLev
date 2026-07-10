import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { ThemeService } from '../../services/theme-service';
import { NavigationService } from '../../services/navigation-service';
import { MenuButton } from '../menu-button/menu-button';

@Component({
  selector: 'app-menu',
  imports: [MenuButton],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  menuService = inject(MenuService);
  themeService = inject(ThemeService);
  navigationService = inject(NavigationService);

  getDarkmodeButtonName():string{
    if (this.themeService.darkmode()){
      return "Darkmode";
    }
    return "Lightmode";
  }
  getDarkmodeButtonIcon():string{
    if (this.themeService.darkmode()){
      return "moon.svg";
    }
    return "sun.svg";
  }
}
