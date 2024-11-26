import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Set } from 'src/app/core/models/set.model';
@Component({
  selector: 'app-set-selector',
  templateUrl: './set-selector.component.html',
  styleUrls: ['./set-selector.component.scss'],
})
export class SetSelectorComponent  implements OnInit {

  constructor() { }


  @Input() sets$: Observable<Set[]> | undefined; // Recibe la lista de sets desde el componente padre
  @Output() setSelected = new EventEmitter<string>(); // Emite el set seleccionado

  selectedSetId: string = ''; // Variable para almacenar el set seleccionado

  onSetSelected(event: any) {
    this.setSelected.emit(this.selectedSetId); // Emite el valor seleccionado al componente padre
  }

  ngOnInit() {}

}
