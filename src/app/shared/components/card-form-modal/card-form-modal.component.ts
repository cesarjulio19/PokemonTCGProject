import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { Set } from 'src/app/core/models/set.model';

@Component({
  selector: 'app-card-form-modal',
  templateUrl: './card-form-modal.component.html',
  styleUrls: ['./card-form-modal.component.scss'],
})
export class CardFormModalComponent  implements OnInit {
  raritys:string[] = ['ACE SPEC Rare', 'Amazing Rare', 'Classic Collection','Common','Double Rare','Hyper Rare','Illustration Rare','LEGEND','Promo',
    'Radiant Rare','Rare','Rare ACE','Rare BREAK','Rare Holo','Rare Holo EX','Rare Holo GX','Rare Holo LV.X','Rare Holo Star','Rare Holo V','Rare Holo VMAX',
    'Rare Holo VSTAR','Rare Prime','Rare Prism Star','Rare Rainbow','Rare Secret','Rare Shining','Rare Shiny','Rare Shiny GX','Rare Ultra','Shiny Rare','Shiny Ultra Rare',
    'Special Illustration Rare','Trainer Gallery Rare Holo','Ultra Rare','Uncommon'
  ];
  types:string[]= ['Colorless','Darkness','Dragon','Fairy','Fighting','Fire','Grass','Lightning','Metal','Psychic','Water'];
  superTypes:string[] = ['Energy','Pokémon','Trainer']
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;

  private _sets:BehaviorSubject<Set[]> = new BehaviorSubject<Set[]>([]);
  public sets$:Observable<Set[]> = this._sets.asObservable();

  @Input() set sets(sets:Set[]){
    this._sets.next(sets);
  }

  @Input() set card(_card:Card){
    if(_card && _card.id)
      this.mode = 'edit';
    
      this.formGroup.controls['name'].setValue(_card.name);
      this.formGroup.controls['number'].setValue(_card.number);
      this.formGroup.controls['picture'].setValue(_card.picture?.url);
      this.formGroup.controls['type'].setValue(_card.type);
      this.formGroup.controls['rarity'].setValue(_card.rarity);
      this.formGroup.controls['superType'].setValue(_card.superType);
      this.formGroup.controls['setId'].setValue(_card.setId);
  }

  constructor(private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform) { 
      this.isMobile = this.platform.is('ios') || this.platform.is('android');
      this.formGroup = this.fb.group({
        name:['', [Validators.required, Validators.minLength(2)]],
        number:['', [Validators.required]],
        picture: ['', [Validators.required]],
        type:['', [Validators.required]],
        rarity:['', [Validators.required]],
        superType:['', [Validators.required]],
        setId:[null, [Validators.required]]
      });
    }

  ngOnInit() {}

  get name(){
    return this.formGroup.controls['name'];
  }

  get number(){
    return this.formGroup.controls['number'];
  }

  get type(){
    return this.formGroup.controls['type'];
  }

  get rarity(){
    return this.formGroup.controls['rarity'];
  }

  get superType(){
    return this.formGroup.controls['superType'];
  }

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

  onSubmit(){
    if (this.formGroup.valid) {
      this.modalCtrl.dismiss(
          (this.mode=='new'?
            this.formGroup.value:
            this.getDirtyValues(this.formGroup)), this.mode
      );
    } else {
      console.log('Formulario inválido');
    }

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

 

}
