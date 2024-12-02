import { Component, OnInit } from '@angular/core';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { Router } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { UsersService } from './core/services/impl/users.service';
import { UserStrapi } from './core/models/user.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  currentLang: string;
  user?: UserStrapi | null;

  constructor(public authSvc: BaseAuthenticationService,
    private router: Router,
    private languageService: LanguageService,
    private authService:BaseAuthenticationService,
    private usersSvc:UsersService,
  ) {
    this.currentLang = this.languageService.getStoredLanguage();
  }

  async ngOnInit(): Promise<void> {
    try{
      const userAuth = await this.authService.getCurrentUser();
      if(userAuth){
        this.user = await lastValueFrom(this.usersSvc.getById(userAuth.id))

      }
      console.log(this.user)
    }catch(error){
      console.error(error);
    }
  }

  

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
    this.currentLang = lang;
    this.languageService.storeLanguage(lang);
  }

  logout() {

    this.authSvc.signOut().subscribe(() => {
      this.router.navigate(['login'])
    })
    
  }
}
