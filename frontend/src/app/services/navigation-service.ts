import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';

@Service()
export class NavigationService {
    private router = inject(Router);

    goto(route: string){
        this.router.navigate([route])
    }
}
