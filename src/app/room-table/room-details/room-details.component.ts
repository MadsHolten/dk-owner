
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog.component';

@Component({
    selector: 'room-details',
    templateUrl: './room-details.component.html',
    styleUrls: ['./room-details.component.css']
  })
  export class RoomDetailsComponent {
    @Input() URI: string;
    @Output() delete = new EventEmitter();

    constructor(
      public dialog: MatDialog) { }

    deleteItem(){
      // Emit event "true"
      this.delete.emit(true);
    }

    deleteRoomDialog(){
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: "Delete room", 
          message: "Are you sure you want to delete the room? Please type in the URI of the room to confirm deletion.",
          cancelText: "No",
          confirmText: "Yes",
          validationText: this.URI
        }
      });

      dialogRef.afterClosed().subscribe(response => {
        if(response == true){
          // Emit event "true"
          this.delete.emit(true);
        }
      });
    }
  }