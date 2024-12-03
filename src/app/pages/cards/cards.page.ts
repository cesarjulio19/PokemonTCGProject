import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, SelectChangeEventDetail } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Set } from 'src/app/core/models/set.model';
import { CardsService } from 'src/app/core/services/impl/cards.service';
import { SetsService } from 'src/app/core/services/impl/sets.service';
import { CardModalComponent } from 'src/app/shared/components/card-modal/card-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  _cards:BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  cards$:Observable<Card[]> = this._cards.asObservable();

  _sets:BehaviorSubject<Set[]> = new BehaviorSubject<Set[]>([]);
  sets$:Observable<Set[]> = this._sets.asObservable();

  constructor(private cardsSvc:CardsService,
    private setsSvc:SetsService,
    private modalCtrl: ModalController ) { }

   currentPage: number = 1;
   pageSize: number = 25;
   totalPages: number = 1;
   selectedSetId: string = '-1';
   setImage:string | undefined = "/assets/images/fondo.jpg";

  

  ngOnInit() {

    this.setsSvc.getAll( ).subscribe({
      next: (response: Set[]) => {
        this._sets.next(response);
      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    });



    this.loadCards();
  }
  

  onSetSelected(selectedSetId: string) {
    this.selectedSetId = selectedSetId;
    if(selectedSetId != "-1"){

      this.setsSvc.getById(selectedSetId).subscribe({
        next: (response: Set | null) => {
           if(response){
            console.log(response.picture?.url)
            if (!response.picture?.url){
              this.setImage = "/assets/images/fondo.jpg"
            }else{
              this.setImage = response.picture?.url
            }
              
              console.log( this.setImage )
              this.currentPage = 1;
              this._cards.next([]); 
              this.loadCards(); 
           }
        }
      })

    }else{
      this.setImage = "/assets/images/fondo.jpg"
      console.log( this.setImage )
      this.currentPage = 1;
      this._cards.next([]); 
      this.loadCards(); 
    }

    
  }

  loadCards() {
    this.currentPage = 1
    if(this.selectedSetId != "-1"){
     
      
    this.cardsSvc.getCardsBySetPaginated(this.selectedSetId, this.currentPage, this.pageSize).subscribe({
      next:(response:Paginated<Card>) =>{
        console.log(response.data, "response")
        this._cards.next([...response.data]);
        this.currentPage++;
        this.totalPages = response.pages;

      },
      error: (err) => {
        console.error('Error al cargar las cartas', err);
      }

    });

    }else{

      this.cardsSvc.getAll(this.currentPage, this.pageSize).subscribe({
        next:(response:Paginated<Card>) =>{

        this._cards.next([...response.data]);
        this.currentPage++;
        this.totalPages = response.pages;

      },
      error: (err) => {
        console.error('Error al cargar las cartas', err);
      }

      })


    }

    
  }

  loadMoreCards(notify:HTMLIonInfiniteScrollElement | null = null) {

    if(this.selectedSetId != "-1"){

      if(this.currentPage<=this.totalPages){
        this.cardsSvc.getCardsBySetPaginated(this.selectedSetId, this.currentPage, this.pageSize).subscribe({
          next:(response:Paginated<Card>)=>{
            this._cards.next([...this._cards.value, ...response.data]);
            this.currentPage++;

            notify?.complete();
          }
        });
      }
      else{
        notify?.complete();
      }

    }else{

      if(this.currentPage<=this.totalPages){
        this.cardsSvc.getAll(this.currentPage, this.pageSize).subscribe({
          next:(response:Paginated<Card>)=>{
            this._cards.next([...this._cards.value, ...response.data]);
            this.currentPage++;
            console.log(response.data)
            notify?.complete();
          }
        });
      }
      else{
        notify?.complete();
      }

    }
    
    
  }

  async openCardModal(card: Card) {
    const modal = await this.modalCtrl.create({
      component: CardModalComponent,
      componentProps: { card },
    });
    await modal.present();
  }

  

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.loadMoreCards(ev.target);
    
  }

 

  

}
