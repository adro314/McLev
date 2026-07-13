import { Service, signal } from '@angular/core';

@Service()
export class MenuService {
    visible = signal(false);

    toggleMenu(){
        this.visible.update(v => !v);
    }

    setMenuVis(visible: boolean){
        this.visible.update(() => visible);
    }
}
