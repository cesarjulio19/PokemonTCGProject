import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() card!: Card;

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss()

  }

}
