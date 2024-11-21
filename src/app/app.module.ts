import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, GROUPS_API_URL_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN } from './core/repositories/repository.tokens';
import { AuthMappingFactory, AuthenticationServiceFactory, MediaServiceFactory } from './core/repositories/repository.factory';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule, SharedModule],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: BACKEND_TOKEN, useValue: 'strapi' },
    { provide: PEOPLE_RESOURCE_NAME_TOKEN, useValue: 'people' },
    { provide: GROUPS_RESOURCE_NAME_TOKEN, useValue: 'groups' },
    { provide: PEOPLE_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: GROUPS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local' },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local/register' },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: 'http://localhost:1337/api/users/me' },
    { provide: UPLOAD_API_URL_TOKEN, useValue: 'http://localhost:1337/api/upload' },
    
    AuthMappingFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    AuthenticationServiceFactory,
    MediaServiceFactory

    // ... otros proveedores],
],
  bootstrap: [AppComponent],
})
export class AppModule {}
