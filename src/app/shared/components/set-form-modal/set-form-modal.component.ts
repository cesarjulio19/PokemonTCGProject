import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-set-form-modal',
  templateUrl: './set-form-modal.component.html',
  styleUrls: ['./set-form-modal.component.scss'],
})
export class SetFormModalComponent  implements OnInit {

  
  isMobile: boolean = false;

  
  constructor(private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform) { }

  ngOnInit() {}

}
