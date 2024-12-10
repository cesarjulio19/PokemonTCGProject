import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SetSelectorComponent } from './components/set-selector/set-selector.component';
import { CardModalComponent } from './components/card-modal/card-modal.component';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';
import { PackModalComponent } from './components/pack-modal/pack-modal.component';
import { SearchSetSelectableComponent } from './components/search-set-selectable/search-set-selectable.component';
import { CardFormModalComponent } from './components/card-form-modal/card-form-modal.component';
import { SetFormModalComponent } from './components/set-form-modal/set-form-modal.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { BlockButtonDirective } from './directives/block-button.directive';



@NgModule({
  declarations: [SetSelectorComponent, CardModalComponent
    ,PictureSelectableComponent,PackModalComponent,SearchSetSelectableComponent,
    CardFormModalComponent,SetFormModalComponent,CapitalizePipe,BlockButtonDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FormsModule,
  ],
  exports: [SetSelectorComponent, CardModalComponent
    ,PictureSelectableComponent,PackModalComponent,SearchSetSelectableComponent,
    CardFormModalComponent,SetFormModalComponent,CapitalizePipe,BlockButtonDirective
  ]
})
export class SharedModule { }
