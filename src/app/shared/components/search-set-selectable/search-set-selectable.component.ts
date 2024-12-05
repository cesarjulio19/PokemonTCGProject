import { Component, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonInput, IonPopover } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Set } from 'src/app/core/models/set.model';
import { SetsService } from 'src/app/core/services/impl/sets.service';

@Component({
  selector: 'app-search-set-selectable',
  templateUrl: './search-set-selectable.component.html',
  styleUrls: ['./search-set-selectable.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchSetSelectableComponent),
    multi: true
  }]
})
export class SearchSetSelectableComponent  implements OnInit, ControlValueAccessor, OnDestroy {

  setSelected:Set | null = null;
  disabled:boolean = true;
  private _sets:BehaviorSubject<Set[]> = new BehaviorSubject<Set[]>([]);
  public sets$ = this._sets.asObservable();

  propagateChange = (obj: any) => {}

  @ViewChild('popover', { read: IonPopover }) popover: IonPopover | undefined;

  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;

  constructor(
    public setsSvc:SetsService
  ) { }

  ngOnDestroy(): void {
    this.popover?.dismiss();
  }

  onLoadSets(){
    this.loadSets("");
  }

  private async loadSets(filter:string){
    this.page = 1;
    this.setsSvc.getAll(this.page, this.pageSize, {"name":filter}).subscribe({
      next:response=>{
        this._sets.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      },
      error:err=>{}
    }) 
  }

  loadMoreSets(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.setsSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Set>)=>{
          this._sets.next([...this._sets.value, ...response.data]);
          this.page++;
          notify?.complete();
        }
      });
    }
    else{
      notify?.complete();
    }
  }

  onMoreSets(ev:InfiniteScrollCustomEvent){
    this.loadMoreSets(ev.target);
  }

  private async selectSet(id:string|undefined, propagate:boolean=false){
    if(id){
      this.setSelected  = await lastValueFrom(this.setsSvc.getById(id));
    }
    else
      this.setSelected = null;
    if(propagate && this.setSelected)
      this.propagateChange(this.setSelected.id);
  }

  writeValue(obj: any): void {
    this.selectSet(obj);
      
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private async filter(filtering:string){
    this.loadSets(filtering);
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onSetClicked(popover:IonPopover, set:Set){
    this.selectSet(set.id, true);
    popover.dismiss();
  }

  clearSearch(input:IonInput){
    input.value = "";
    this.filter("");
  }

  deselect(popover:IonPopover|null=null){
    this.selectSet(undefined, true);
    if(popover)
      popover.dismiss();
  }


  ngOnInit() {}

}
