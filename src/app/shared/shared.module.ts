import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SetSelectorComponent } from './components/set-selector/set-selector.component';
import { CardModalComponent } from './components/card-modal/card-modal.component';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';



@NgModule({
  declarations: [SetSelectorComponent, CardModalComponent,PictureSelectableComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FormsModule,
  ],
  exports: [SetSelectorComponent, CardModalComponent,PictureSelectableComponent
  ]
})
export class SharedModule { }
