import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-set-form-modal',
  templateUrl: './set-form-modal.component.html',
  styleUrls: ['./set-form-modal.component.scss'],
})
export class SetFormModalComponent  implements OnInit {

  formGroup:FormGroup;
  isMobile: boolean = false;

  
  constructor(private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform) { 
      this.isMobile = this.platform.is('ios') || this.platform.is('android');
      this.formGroup = this.fb.group({
        name:['', [Validators.required, Validators.minLength(2)]],
        picture: [''],
      });
    }

  ngOnInit() {}

  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};
  
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });
  
    return dirtyValues;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formValues = this.getDirtyValues(this.formGroup); 
      this.modalCtrl.dismiss(formValues);
    } else {
      console.log('Formulario inválido');
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  get name(){
    return this.formGroup.controls['name'];
  }

}
