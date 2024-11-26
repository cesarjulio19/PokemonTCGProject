import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, CARDS_API_URL_TOKEN, CARDS_RESOURCE_NAME_TOKEN, GROUPS_API_URL_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, SETS_API_URL_TOKEN, SETS_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN } from './core/repositories/repository.tokens';
import { AuthMappingFactory, AuthenticationServiceFactory, CardsMappingFactory, CardsRepositoryFactory, MediaServiceFactory, SetsMappingFactory, SetsRepositoryFactory } from './core/repositories/repository.factory';
import { SharedModule } from './shared/shared.module';
import { CardsService } from './core/services/impl/cards.service';
import { SetsService } from './core/services/impl/sets.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule, SharedModule,HttpClientModule,],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: BACKEND_TOKEN, useValue: 'strapi' },
    { provide: CARDS_RESOURCE_NAME_TOKEN, useValue: 'cards' },
    { provide: SETS_RESOURCE_NAME_TOKEN, useValue: 'sets' },
    { provide: CARDS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: SETS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local' },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local/register' },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: 'http://localhost:1337/api/users/me' },
    { provide: UPLOAD_API_URL_TOKEN, useValue: 'http://localhost:1337/api/upload' },
    
    CardsMappingFactory,
    SetsMappingFactory,
    AuthMappingFactory,
    CardsRepositoryFactory,
    SetsRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación

    {
      provide: 'CardsService',
      useClass: CardsService
    },
    {
      provide: 'SetsService',
      useClass: SetsService
    },

    AuthenticationServiceFactory,
    MediaServiceFactory

    // ... otros proveedores],
],
  bootstrap: [AppComponent],
})
export class AppModule {}
