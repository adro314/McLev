import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NavigationService } from './navigation-service';

@Service()
export class UserService {
    private http = inject(HttpClient);
    navigationService = inject(NavigationService);

    loggedIn = false;
    username:string = "";

    async getTest(){
        console.log("test")
        console.log(await firstValueFrom(this.http.get('/api/test')));
    }

    async login(data:any){
        const res = await firstValueFrom(this.http.post<LoginResp>('/api/login',data));
        if (res.valid){
            this.loggedIn = true;
            this.username = data.username;
            this.navigationService.goto("")
        }
    }
}
export interface LoginResp {
    valid: boolean,
    reason?: string
}