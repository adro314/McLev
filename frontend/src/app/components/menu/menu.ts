import { Component, inject, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { ThemeService } from '../../services/theme-service';
import { NavigationService } from '../../services/navigation-service';
import { MenuButton } from '../menu-button/menu-button';
import { UserService } from '../../services/user-service';

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
  userService = inject(UserService);

  @ViewChild('menu')
  menu!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    try {
      if (!this.menu.nativeElement.contains(event.target as Node)) {
        this.menuService.setMenuVis(false);
      }
    } catch {}
  }

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
