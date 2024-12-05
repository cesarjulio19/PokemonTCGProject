import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { MyCard } from 'src/app/core/models/mycard.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Set } from 'src/app/core/models/set.model';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { CardsService } from 'src/app/core/services/impl/cards.service';
import { MyCardsService } from 'src/app/core/services/impl/mycards.service';
import { SetsService } from 'src/app/core/services/impl/sets.service';
import { CardModalComponent } from 'src/app/shared/components/card-modal/card-modal.component';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.page.html',
  styleUrls: ['./my-cards.page.scss'],
})
export class MyCardsPage implements OnInit {


  _mycards:BehaviorSubject<MyCard[]> = new BehaviorSubject<MyCard[]>([]);
  mycards$:Observable<MyCard[]> = this._mycards.asObservable();


  _cards:BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  cards$:Observable<Card[]> = this._cards.asObservable();

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  mycards:MyCard[] = [];
  user:any
  isMobile: boolean = false;
  constructor(private mycardsSvc:MyCardsService,
    private cardsSvc:CardsService,
    private authService:BaseAuthenticationService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private platform: Platform,
  ) { 
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
  }

  async ngOnInit() {
    try{
      this.user = await this.authService.getCurrentUser();
    }catch(error){
      console.error(error);
    }
    this._cards.next([])
    this._mycards.next([])
    this.loadCards();
  }

  
   loadCards() {
    this.currentPage = 1
    // obtiene todas las cartas del usuario y los añade al observable
    
      if(this.user){
        this.mycardsSvc.getMyCardsByUser(this.user.id,this.currentPage,25).subscribe({
          next: (response: Paginated<MyCard>) => {
            this._mycards.next([...response.data]);
            console.log(response.data)
            this.currentPage++;
            console.log(this.currentPage,"loadCards")
            this.totalPages = response.pages;
            console.log(this.totalPages)
            this.processMyCards(response.data);

          },
        })
      }
    

    

  }

  

      processMyCards(mycards: MyCard[]) {
        // Por cada carta del usuario, la busca en la tabla de cartas y comprueba si es del mismo set en el que está
        mycards.forEach((mycard) => {
          this.cardsSvc.getById(mycard.cardId!).subscribe({
            next: (response: Card | null) => {
              if (response) {
                const currentCards = this._cards.getValue();
      
                // Comprueba si la carta ya está en _cards
                const exists = currentCards.some((card) => card.id === response.id);
      
                //if (!exists) {
                  // Agrega la carta al array solo si no está presente
                  this._cards.next([...currentCards, response]);
                  console.log("añadido",response)
                //}
              }
            },
            error: (err) => {
              console.error('Error al obtener la carta:', err);
            },
          });
        });
        
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


    loadMoreCards(notify: HTMLIonInfiniteScrollElement | null = null) {
      if (this.user && (this.currentPage <= this.totalPages)) {
        this.mycardsSvc.getMyCardsByUser(this.user.id, this.currentPage, 25).subscribe({
          next: (response: Paginated<MyCard>) => {
            const newMyCards = response.data;
    
            // Actualiza `mycards` acumulando las nuevas cartas
            this._mycards.next([...this._mycards.value, ...response.data])
    
            // Procesa las nuevas cartas
            this.processMyCards(newMyCards);
    
            this.currentPage++;
            console.log(this.currentPage,"loadMore")
            notify?.complete();
          },
          error: (err) => {
            console.error('Error al cargar más cartas:', err);
            notify?.complete();
          },
        });
      } else {
        notify?.complete();
      }
    }

  async onDeleteCard(card: Card) {
    
    this.mycardsSvc.getByCardId(card.id, this.user.id).subscribe({
      next: async (response: MyCard | null) => {
        if(response){
          const quantitymycard:number = response.quantity
          const mycardOnDelete:MyCard = response

          if(quantitymycard > 1){

            const alert = await this.alertCtrl.create({
              header: await this.translate.get('MYCARDS.DELETE.1<').toPromise() + quantitymycard,
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                },
                {
                  text: 'OK',
                  role: 'yes',
                  handler: () => {
                    mycardOnDelete.quantity = mycardOnDelete.quantity -1;

                    this.mycardsSvc.update(mycardOnDelete.id, mycardOnDelete).subscribe({
                      next: response => {
                        
                      },
                      error: err => {}
                    });
                  }
                }
              ]
            });
        
            await alert.present();

          }else{

            const alert = await this.alertCtrl.create({
              header: await this.translate.get('MYCARDS.DELETE.1==').toPromise() + quantitymycard,
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                },
                {
                  text: 'OK',
                  role: 'yes',
                  handler: () => {

                    this.mycardsSvc.delete(mycardOnDelete.id).subscribe({
                      next: response => {
                        const updatedCards = this._cards.getValue().filter((c) => c.id !== card.id);
                        this._cards.next(updatedCards);
                      },
                      error: err => {}
                    });
                  }
                }
              ]
            });
        
            await alert.present();

          }
        }

      }

    })

    
  }


    
  }

