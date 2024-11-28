import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { MyCard } from 'src/app/core/models/mycard.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Set } from 'src/app/core/models/set.model';
import { MyCardsService } from 'src/app/core/services/impl/mycards.service';
import { SetsService } from 'src/app/core/services/impl/sets.service';

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
  pageSize: number = 25;
  totalPages: number = 1;
  selectedSetId: string = '-1';


  constructor(private mycardsSvc:MyCardsService,
    private setsSvc:SetsService,
    private modalCtrl: ModalController) { }

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
    this.currentPage = 1;
    this._mycards.next([]); 
    this.loadCards(); 
    
  }

  loadCards() {

    /*this.currentPage = 1
    if(this.selectedSetId != "-1"){
     
      
    this.mycardsSvc.getMyCardsByUser(this.selectedSetId, this.currentPage, this.pageSize).subscribe({
      next:(response:Paginated<Card>) =>{

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

      })*/


    }
    
  }

