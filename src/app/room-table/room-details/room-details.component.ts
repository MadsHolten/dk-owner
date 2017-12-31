
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'room-details',
    templateUrl: './room-details.component.html',
    styleUrls: ['./room-details.component.css']
  })
  export class RoomDetailsComponent {
    @Input() URI: string;
    @Output() delete = new EventEmitter();

    deleteItem(){
      // Emit event "true"
      this.delete.emit(true);
    }
  }