import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent  implements OnInit {

  isMobile: boolean = false;
  constructor(private modalCtrl: ModalController,
    private platform: Platform
  ) { 
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
  }

  @Input() card!: Card;

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss()

  }

}
