import { effect, Service, signal } from '@angular/core';

@Service()
export class ThemeService {
    darkmode = signal(true);

    constructor(){
        effect(() =>{
            document.body.classList.toggle('darkmode',this.darkmode())
        })
    }

    setTheme(darkmode: boolean){
        this.darkmode.update(() => darkmode)
    }

    toggleTheme(){
        this.darkmode.update(v => !v);
    }
}