import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SetSelectorComponent } from './components/set-selector/set-selector.component';



@NgModule({
  declarations: [SetSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  exports: [SetSelectorComponent
  ]
})
export class SharedModule { }