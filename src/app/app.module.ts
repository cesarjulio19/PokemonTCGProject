import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, CARDS_API_URL_TOKEN, CARDS_RESOURCE_NAME_TOKEN, GROUPS_API_URL_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, MYCARDS_API_URL_TOKEN, MYCARDS_RESOURCE_NAME_TOKEN, PACKS_API_URL_TOKEN, PACKS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, SETS_API_URL_TOKEN, SETS_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN, USERS_API_URL_TOKEN, USERS_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { AuthMappingFactory, AuthenticationServiceFactory, CardsMappingFactory, CardsRepositoryFactory, MediaServiceFactory, MyCardsMappingFactory, MyCardsRepositoryFactory, PacksMappingFactory, PacksRepositoryFactory, SetsMappingFactory, SetsRepositoryFactory, UsersMappingFactory, UsersRepositoryFactory } from './core/repositories/repository.factory';
import { SharedModule } from './shared/shared.module';
import { CardsService } from './core/services/impl/cards.service';
import { SetsService } from './core/services/impl/sets.service';
import { CardModalComponent } from './shared/components/card-modal/card-modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyCardsService } from './core/services/impl/mycards.service';
import { PacksService } from './core/services/impl/packs.service';
import { UsersService } from './core/services/impl/users.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule, SharedModule,HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: BACKEND_TOKEN, useValue: 'strapi' },
    { provide: CARDS_RESOURCE_NAME_TOKEN, useValue: 'cards' },
    { provide: SETS_RESOURCE_NAME_TOKEN, useValue: 'sets' },
    { provide: MYCARDS_RESOURCE_NAME_TOKEN, useValue: 'my-cards' },
    { provide: PACKS_RESOURCE_NAME_TOKEN, useValue: 'packs' },
    { provide: USERS_RESOURCE_NAME_TOKEN, useValue: 'users' },
    { provide: CARDS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: SETS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: MYCARDS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: PACKS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: USERS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local' },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local/register' },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: 'http://localhost:1337/api/users/me' },
    { provide: UPLOAD_API_URL_TOKEN, useValue: 'http://localhost:1337/api/upload' },
    
    CardsMappingFactory,
    SetsMappingFactory,
    MyCardsMappingFactory,
    PacksMappingFactory,
    UsersMappingFactory,
    AuthMappingFactory,
    CardsRepositoryFactory,
    SetsRepositoryFactory,
    MyCardsRepositoryFactory,
    PacksRepositoryFactory,
    UsersRepositoryFactory,
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
    {
      provide: 'MyCardsService',
      useClass: MyCardsService
    },
    {
      provide: 'PacksService',
      useClass: PacksService
    },
    {
      provide: 'UsersService',
      useClass: UsersService
    },

    AuthenticationServiceFactory,
    MediaServiceFactory

    // ... otros proveedores],
],
  bootstrap: [AppComponent],
})
export class AppModule {}
