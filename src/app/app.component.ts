import { Component } from '@angular/core';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { Router } from '@angular/router';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  currentLang: string;

  constructor(public authSvc: BaseAuthenticationService,
    private router: Router,
    private languageService: LanguageService,
  ) {
    this.currentLang = this.languageService.getStoredLanguage();
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
