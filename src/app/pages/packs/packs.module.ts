import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacksPageRoutingModule } from './packs-routing.module';

import { PacksPage } from './packs.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacksPageRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
  ],
  declarations: [PacksPage]
})
export class PacksPageModule {}
