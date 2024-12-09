import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, Platform, SelectChangeEventDetail } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, lastValueFrom, Observable, Subscription } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { Pack } from 'src/app/core/models/pack.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Set } from 'src/app/core/models/set.model';
import { UserStrapi } from 'src/app/core/models/user.model';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { CardsService } from 'src/app/core/services/impl/cards.service';
import { PacksService } from 'src/app/core/services/impl/packs.service';
import { SetsService } from 'src/app/core/services/impl/sets.service';
import { UsersService } from 'src/app/core/services/impl/users.service';
import { CardFormModalComponent } from 'src/app/shared/components/card-form-modal/card-form-modal.component';
import { CardModalComponent } from 'src/app/shared/components/card-modal/card-modal.component';
import { SetFormModalComponent } from 'src/app/shared/components/set-form-modal/set-form-modal.component';

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
  
  user?: UserStrapi | null;
  isMobile: boolean = false;
  isLoading: boolean = false;
  constructor(private cardsSvc:CardsService,
    private setsSvc:SetsService,
    private packsSvc:PacksService,
    private modalCtrl: ModalController,
    private usersSvc:UsersService,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private authService:BaseAuthenticationService,
    private platform: Platform,
    private mediaService:BaseMediaService,
     ) { 
      this.isMobile = this.platform.is('ios') || this.platform.is('android');
     }

   currentPage: number = 1;
   pageSize: number = 25;
   totalPages: number = 1;
   selectedSetId: string = '-1';
   selectedCard:any = null;
   setImage:string | undefined = "/assets/images/fondo.jpg";

  

  async ngOnInit() {

    this.setsSvc.getAll( ).subscribe({
      next: (response: Set[]) => {
        this._sets.next(response);
      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    });

    try{

      const userAuth = await this.authService.getCurrentUser();

      if(userAuth){
        this.user = await lastValueFrom(this.usersSvc.getById(userAuth.id))
        
      }

    }catch(error){
      console.error(error);
    }



    this.loadCards();
  }
  

  onSetSelected(selectedSetId: string) {
    this.selectedSetId = selectedSetId;
    this.setsSvc.getAll( ).subscribe({
      next: (response: Set[]) => {
        this._sets.next(response);
      },
      error: (err) => {
        console.error('Error al obtener los conjuntos:', err);
      }
    });
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

  async openCardEdit(card: any) {
    await this.presentModalCard('edit', card);
    this.selectedCard = card;
  }

  async openSetEdit(setId: string) {
    this.setsSvc.getById(setId).subscribe({
      next:async res =>{
        if(res){
          await this.presentModalSet('edit', res);
        }

      }
    })
  }

  private async presentModalCard(mode:'new'|'edit', card:Card|undefined=undefined){
    let _sets:Set[] = await lastValueFrom(this.setsSvc.getAll())
    const modal = await this.modalCtrl.create({
      component:CardFormModalComponent,
      componentProps:(mode=='edit'?{
        card: card,
        sets: _sets
      }:{
        sets: _sets
      })
    });
    modal.onDidDismiss().then(async (response:any)=>{
      switch (response.role) {
        case 'new':
          const dataNew = response.data
          if(response.data.picture){
            const base64Response = await fetch(dataNew.picture);
            const blob = await base64Response.blob();
            const uploadedBlob = await lastValueFrom(this.mediaService.upload(blob));
            dataNew.picture = uploadedBlob[0];
          }
          this.cardsSvc.add(dataNew).subscribe({
            next:res=>{
              this.loadCards();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          const dataEdit = response.data
          if(response.data.picture){
            const base64Response = await fetch(dataEdit.picture);
            const blob = await base64Response.blob();
            const uploadedBlob = await lastValueFrom(this.mediaService.upload(blob));
            dataEdit.picture = uploadedBlob[0];
          }
          this.cardsSvc.update(card!.id, dataEdit).subscribe({
            next:res=>{
              this.loadCards();
            },
            error:err=>{}
          });
          break;
        default:
          break;
      }
    });
    await modal.present();
  }

  private async presentModalSet(mode:'new'|'edit', set:Set|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:SetFormModalComponent,
      componentProps:(mode=='edit'?{
        set: set,
      }:{
        
      })
    });
    modal.onDidDismiss().then(async (response:any)=>{
      switch (response.role) {
        case 'new':
          const dataNew = response.data
          if(response.data.picture){
            const base64Response = await fetch(dataNew.picture);
            const blob = await base64Response.blob();
            const uploadedBlob = await lastValueFrom(this.mediaService.upload(blob));
            dataNew.picture = uploadedBlob[0];
          }
          this.setsSvc.add(dataNew).subscribe({
            next:res=>{
              let pack: any = {
                name:res.name,
                setId:res.id
              }
              this.packsSvc.add(pack).subscribe({
                next:res =>{
      
                }
              })
            },
            error:err=>{}
          });
      
          this.setsSvc.getAll( ).subscribe({
            next: (response: Set[]) => {
              this._sets.next(response);
            },
            error: (err) => {
              console.error('Error al obtener los conjuntos:', err);
            }
          });

          break;
        case 'edit':
          const dataEdit = response.data
          if(response.data.picture){
            const base64Response = await fetch(dataEdit.picture);
            const blob = await base64Response.blob();
            const uploadedBlob = await lastValueFrom(this.mediaService.upload(blob));
            dataEdit.picture = uploadedBlob[0];
          }

          if(response.data.name){
            this.setsSvc.update(set!.id, dataEdit).subscribe({
              next:resSet=>{
                this.packsSvc.getBySetId(resSet!.id).subscribe({
                  next:res =>{
                      const pack:any = {
                        name:response.data.name
                      }
                      this.packsSvc.update(res!.id,pack).subscribe({
                        next:respack =>{

                        }
                      })
                  }
                })
              },
              error:err=>{}
            });

          }else{
            this.setsSvc.update(set!.id,dataEdit).subscribe({
              next: res =>{

              }
            })
          }
          this.setsSvc.getAll( ).subscribe({
            next: (response: Set[]) => {
              this._sets.next(response);
            },
            error: (err) => {
              console.error('Error al obtener los conjuntos:', err);
            }
          });
          break;
        default:
          break;
      }
    });
    await modal.present();
  }


  async onAddCard(){
    await this.presentModalCard('new');
  }

  async onAddSet(){
    await this.presentModalSet('new');
  }



  async onDeleteCard(card: Card) {

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      console.log('Operation completed');
    }, 3000);
    
    const alert = await this.alertCtrl.create({
      header: await this.translate.get('CARD.DELETE').toPromise(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'yes',
          handler: () => {
            this.cardsSvc.delete(card.id).subscribe({
              next: response => {
                this.loadCards();
              },
              error: err => {}
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async onDeleteSet(setId: string) {
    const alert = await this.alertCtrl.create({
      header: await this.translate.get('SET.DELETE_MESSAGE').toPromise(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'yes',
          handler: () => {
            this.packsSvc.getBySetId(setId).subscribe({
              next:res=>{
                if(res){
                  this.packsSvc.delete(res.id).subscribe({
                    next:res=>{

                    }
                  })
                }
              }
            })

            this.setsSvc.delete(setId).subscribe({
              next: response => {
                this.loadCards();
              },
              error: err => {}
            });

            this.setsSvc.getAll( ).subscribe({
              next: (response: Set[]) => {
                this._sets.next(response);
              },
              error: (err) => {
                console.error('Error al obtener los conjuntos:', err);
              }
            });

          }
        }
      ]
    });

    await alert.present();
  }


 
  

 

  

}
