import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-pack-modal',
  templateUrl: './pack-modal.component.html',
  styleUrls: ['./pack-modal.component.scss'],
})
export class PackModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  @Input() cards!: Card[];
  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss()

  }


}
