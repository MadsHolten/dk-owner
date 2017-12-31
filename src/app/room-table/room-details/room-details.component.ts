
import { Component, Input } from '@angular/core';

@Component({
    selector: 'room-details',
    templateUrl: './room-details.component.html',
    styleUrls: ['./room-details.component.css']
  })
  export class RoomDetailsComponent {
    @Input() URI: string;
  }