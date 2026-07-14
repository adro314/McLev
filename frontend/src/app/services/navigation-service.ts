import { inject, Service } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from './menu-service';
import { filter } from 'rxjs';

@Service()
export class NavigationService {
    private router = inject(Router);
    menuService = inject(MenuService);

    goto(route: string){
        this.router.navigate([route])
        this.menuService.setMenuVis(false);
    }

    constructor() {
        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
            this.menuService.setMenuVis(false);
        })
    }
}
