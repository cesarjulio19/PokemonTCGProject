import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { MyCard } from 'src/app/core/models/mycard.model';
import { Pack } from 'src/app/core/models/pack.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Set } from 'src/app/core/models/set.model';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { CardsService } from 'src/app/core/services/impl/cards.service';
import { MyCardsService } from 'src/app/core/services/impl/mycards.service';
import { PacksService } from 'src/app/core/services/impl/packs.service';
import { SetsService } from 'src/app/core/services/impl/sets.service';
import { PackModalComponent } from 'src/app/shared/components/pack-modal/pack-modal.component';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.page.html',
  styleUrls: ['./packs.page.scss'],
})
export class PacksPage implements OnInit {

  _cards:BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  cards$:Observable<Card[]> = this._cards.asObservable();

  _cardsPack:BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  cardsPack$:Observable<Card[]> = this._cardsPack.asObservable();

  _sets:BehaviorSubject<Set[]> = new BehaviorSubject<Set[]>([]);
  sets$:Observable<Set[]> = this._sets.asObservable();

  _pack:BehaviorSubject<Pack> = new BehaviorSubject<Pack>({
    name:"",
    id:"",
  });
  pack$:Observable<Pack> = this._pack.asObservable();
  page:number = 1
  canOpen:boolean = true
  isMobile: boolean = false;
  constructor(private cardsSvc:CardsService,
    private setsSvc:SetsService,
    private packsSvc:PacksService,
    private myCardsSvc:MyCardsService,
    private authService:BaseAuthenticationService,
    private translateService: TranslateService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private platform: Platform,
    ) {
      this.isMobile = this.platform.is('ios') || this.platform.is('android');
     }

  selectedSetId: string = '-1';
  //setImage:string | undefined = "/assets/images/fondo.jpg";
  setImage:string | undefined = "/assets/images/fondo.jpg";
  pack:Pack | undefined
  user:any
  isopen:boolean = false
  isLoading = false;
  async ngOnInit() {

    try{
      this.user = await this.authService.getCurrentUser();
    }catch(error){
      console.error(error);
    }

    this.setsSvc.getAll( ).subscribe({
      next: (response: Set[]) => {
        this._sets.next(response);
      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    });


    this.cardsSvc.getAll(1,25).subscribe({
      next: (response: Paginated<Card>) =>{
        console.log(response,"response pages")
       let totalPage = response.pages
       console.log(totalPage,"totalPage")
       this.page = Math.floor(Math.random() * totalPage) + 1;
       console.log(this.page,"page")

       this.cardsSvc.getAll(this.page,25).subscribe({
        next: (response: Paginated<Card>) =>{
         this._cards.next(response.data)
         console.log(response.data, "data -1")
        },
        error: (err) => {
          console.error('Error al obtener los conjuntos:', err);
        }
      })

      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    })


    this.packsSvc.getBySetId(this.selectedSetId).subscribe({
      next: (response: Pack | null) =>{
        if(response){
          this._pack.next(response)
        }

      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    })

    


  }
 
  onSetSelected(selectedSetId: string){
    this.selectedSetId = selectedSetId

    this.setsSvc.getAll( ).subscribe({
      next: (response: Set[]) => {
        this._sets.next(response);
      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    });


    if(this.selectedSetId != "-1"){

      this.packsSvc.getBySetId(this.selectedSetId).subscribe({
        next: (response: Pack | null) =>{
          if(response){
            this._pack.next(response)
          }
  
        },
        error: (err) => {
          console.error('Error al obtener los conjuntos:', err);
        }
      })

      this.setsSvc.getById(this.selectedSetId).subscribe({
        next: (response: Set | null) => {
          if(response){
            if(response.picture?.url){
              this.setImage = response.picture?.url
            }else{
              this.setImage = "/assets/images/fondo.jpg"
            }
            
          }
        },
        error: (err) => {
          console.error('Error al obtener los conjuntos:', err);
        }
      })

    }else{

      this.setImage = "/assets/images/fondo.jpg"
      this.canOpen = true
    }
  

    if(this.selectedSetId == "-1"){

      this.cardsSvc.getAll(1,25).subscribe({
        next: (response: Paginated<Card>) =>{
         let totalPage = response.pages
         this.page = Math.floor(Math.random() * totalPage) + 1;

         this.cardsSvc.getAll(this.page,25).subscribe({
          next: (response: Paginated<Card>) =>{
           this._cards.next(response.data)
           console.log(response.data, "data -1")
          },
          error: (err) => {
            console.error('Error al obtener los conjuntos:', err);
          }
        })

        },
        error: (err) => {
          console.error('Error al obtener los conjuntos:', err);
        }
      })

      

    }else{

      this.cardsSvc.getCardsBySetPaginated(this.selectedSetId,1,25).subscribe({
        next: (response: Paginated<Card>) =>{
          if(response.data.length < 5){
            this.canOpen = false;

          }else{
            let totalPage = response.pages
            this.page = Math.floor(Math.random() * totalPage) + 1;
            this.canOpen = true

            this.cardsSvc.getCardsBySetPaginated(this.selectedSetId,this.page,25).subscribe({
              next: (response: Paginated<Card>) =>{
                if(response.data.length < 5){
                  this.canOpen = false;
      
                }else{
                  this._cards.next(response.data)
                  console.log(response.data, "data no -1")
                  this.canOpen = true
                }
                
        
              },
              error: (err) => {
                console.error('Error al obtener los conjuntos:', err);
              }
            })

            

          }
        

  
        },
        error: (err) => {
          console.error('Error al obtener los conjuntos:', err);
        }
      })

      
    }



    

    /*this.cardsSvc.getCardsBySet(this.selectedSetId).subscribe({
      next: (response: Card[]) =>{
        if (response) { // Verificar si response.data existe
          console.log(response,"response")
          this._cards.next(response);
    
          if (response.length < 5) {
            console.log(response.length, "cartas");
            this.canOpen = false;
          }
        } else {
          console.warn('No se obtuvieron datos en la respuesta');
          console.log(response,"response")
          this.canOpen = false
        }


      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    })*/


  }

  openPack(){
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      console.log('Operation completed');
    }, 3000);

    

    this.getRandomCards(this.cards$).subscribe({
      next: (randomCards: Card[]) =>{
        this._cardsPack.next(randomCards)
        console.log(randomCards, "random cards")
        this.isopen = true
      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    })

    const cardsPack = this._cardsPack.getValue()
    console.log(cardsPack, "cards pack")

    cardsPack.forEach((card) => {
        
       this.myCardsSvc.getByCardId(card.id, this.user.id).subscribe({
        next: (mycard: MyCard | null) =>{
           if(mycard != null){
             const response = mycard
             console.log(mycard, "no null")
             response.quantity = response.quantity+1
             this.myCardsSvc.update(mycard.id,response).subscribe({
              next: response => {
                console.log("modificado")
              },
              error: err => {}
             });
           }else{
            const response:any={
              quantity:1,
              cardId: card.id,
              userId: this.user.id
            }
            console.log(mycard, "null")
            this.myCardsSvc.add(response).subscribe({

              next: response => {
                        console.log("añadido")
              },
              error: err => {}

            })

           }
        },
        error: (err) => {
          console.error('Error al obtener los conjuntos:', err);
        }

       })
    })
    

    this.openCardModal()


  }

  Back(){
    this.isopen = false
    this.setImage = "/assets/images/fondo.jpg"
  }


  getRandomCards(cards$: Observable<Card[]>): Observable<Card[]> {
    return cards$.pipe(
      map((cards) => {
        if (!cards || cards.length < 5) {

         throw new Error('No hay suficientes cartas para seleccionar.');
          
        }else{
          return this.shuffle(cards).slice(0, 5);
        }
        
      })
    );
  }
  
  // Función para barajar las cartas
  shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  async openCardModal() {
    const modal = await this.modalCtrl.create({
      component: PackModalComponent,
      componentProps: { cards: this._cardsPack.getValue() },
    });
    await modal.present();
  }








}
