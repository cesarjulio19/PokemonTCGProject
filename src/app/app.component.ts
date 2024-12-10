import { Component, OnInit } from '@angular/core';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { Router } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { UsersService } from './core/services/impl/users.service';
import { UserStrapi } from './core/models/user.model';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  private _user:BehaviorSubject<any> = new BehaviorSubject<any>({});
  public user$:Observable<any> = this._user.asObservable();

  currentLang: string;
  isMobile: boolean = false;
  constructor(public authSvc: BaseAuthenticationService,
    private router: Router,
    private languageService: LanguageService,
    public authService:BaseAuthenticationService,
    private usersSvc:UsersService,
    private platform: Platform,
  ) {
    this.currentLang = this.languageService.getStoredLanguage();
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    
  }

  async ngOnInit(): Promise<void> {
    try{
      const userAuth = await this.authService.getCurrentUser();
      
      if(userAuth){
        this._user.next(await lastValueFrom(this.usersSvc.getById(userAuth.id)))
        
      }
      
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
