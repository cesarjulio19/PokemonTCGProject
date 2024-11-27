import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCardsPageRoutingModule } from './my-cards-routing.module';

import { MyCardsPage } from './my-cards.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCardsPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [MyCardsPage]
})
export class MyCardsPageModule {}
