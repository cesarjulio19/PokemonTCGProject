import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
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

  _sets:BehaviorSubject<Set[]> = new BehaviorSubject<Set[]>([]);
  sets$:Observable<Set[]> = this._sets.asObservable();


  _cards:BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  cards$:Observable<Card[]> = this._cards.asObservable();

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  selectedSetId: string = '-1';
  mycards:MyCard[] = [];
  user:any
  setImage:string | undefined = "/assets/images/fondo.jpg";

  constructor(private mycardsSvc:MyCardsService,
    private setsSvc:SetsService,
    private cardsSvc:CardsService,
    private authService:BaseAuthenticationService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,) { }

  ngOnInit() {

    this.setsSvc.getAll( ).subscribe({
      next: (response: Set[]) => {
        this._sets.next(response);
      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    });

    
    this._mycards.next([]); 
    this._cards.next([]);
    this.mycards = [] ;
    this.loadCards();
  }

  onSetSelected(selectedSetId: string) {

    this.selectedSetId = selectedSetId;
    if(selectedSetId != "-1"){

      this.setsSvc.getById(selectedSetId).subscribe({
        next: (response: Set | null) => {
           if(response){
            if (!response.picture?.url){
              this.setImage = "/assets/images/fondo.jpg"
            }else{
              this.setImage = response.picture?.url
            }
              
              console.log( this.setImage )
              this.currentPage = 1;
              this._mycards.next([]); 
              this._cards.next([]); 
              this.loadCards(); 
           }
        }
      })

    }else{
      this.setImage = "/assets/images/fondo.jpg"
      console.log( this.setImage )
      this.currentPage = 1;
      this._mycards.next([]); 
      this._cards.next([]); 
      this.loadCards(); 
    }
    
  }

  async loadCards() {
    this.currentPage = 1
    // obtiene todas las cartas del usuario y los añade al observable
    try {
      this.user = await this.authService.getCurrentUser();
      console.log(this.user)
      if(this.user){
        this.mycardsSvc.getMyCardsByUser(this.user.id,this.currentPage,this.pageSize).subscribe({
          next: (response: Paginated<MyCard>) => {
            this._mycards.next([...response.data]);
            this.mycards = response.data;
            console.log(this._mycards.getValue(), "adios")
            this.currentPage++;
            this.totalPages = response.pages;
            this.processMyCards(this.mycards);

          },
        })
      }
      
    } catch (error) {
      console.error(error);
    }
    

    

  }

  processMyCards(mycards: MyCard[]) {
    const processedCards: Card[] = [];
    // por cada carta del usuario, lo busca en la tabla de cartas y comprueba si es del mismo set en el que esta
    if(this.selectedSetId == "-1"){

      mycards.forEach((mycard) => {
        this.cardsSvc.getById(mycard.cardId!).subscribe({
          next: (response: Card | null) => {
  
              if(response){

                if(response.id == '1915'){
                  console.log(response)
                }
  
                const currentCards = this._cards.getValue();

                // Agrega la carta al array.
                this._cards.next([...currentCards, response]);
    

                
    
    
              }
  
            
            
  
          },
          error: (err) => {
            console.error('Error al obtener la carta:', err);
          }
        })
      });

    }else{

      mycards.forEach((mycard) => {
        this.cardsSvc.getById(mycard.cardId!).subscribe({
          next: (response: Card | null) => {
              if(response){
                 console.log(response, "carta")
                if(response.setId == this.selectedSetId ){
                 
                  const currentCards = this._cards.getValue();
      
                  // Agrega la carta al array.
                  this._cards.next([...currentCards, response]);
                  
      
      
                }

              }
  
            
            
  
          },
          error: (err) => {
            console.error('Error al obtener la carta:', err);
          }
        })
      });

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

  loadMoreCards(notify:HTMLIonInfiniteScrollElement | null = null) {

    if(this.user && this.currentPage<=this.totalPages){

      this.mycardsSvc.getMyCardsByUser(this.user.id,this.currentPage,this.pageSize).subscribe({
        next: (response: Paginated<MyCard>) => {
          this._mycards.next([...this._mycards.value, ...response.data]);
          this.mycards = response.data;
          this.currentPage++;
          this.processMyCards(this.mycards);
          notify?.complete();
        },
      })
    }else{
      notify?.complete();
    }


    
  }

  async onDeleteCard(card: Card) {
    
    this.mycardsSvc.getByCardId(card.id).subscribe({
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

