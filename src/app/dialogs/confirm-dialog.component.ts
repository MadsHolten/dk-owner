import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

    private confirmDisabled: boolean = true;
    private value = '';

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            // If no validation text is given, the confirm button should just be active
            if(!data.validationText){
                this.confirmDisabled = false;
            }
            // Defaults
            if(!data.title) data.title = 'Confirm';
            if(!data.message) data.message = 'Are you sure?';
            if(!data.cancelText) data.cancelText = 'Cancel';
            if(!data.confirmText) data.confirmText = 'Confirm';
        }

    evaluateInput(){
        if(this.value == this.data.validationText){
            this.confirmDisabled = false;
        }else{
            this.confirmDisabled = true;
        }
    }
    
    onNoClick(): void {
        this.dialogRef.close(null);
    }

    onCloseConfirm(): void {
        this.dialogRef.close(true);
    }

    onCloseCancel(): void {
        this.dialogRef.close(null);
    }

    backdropClick(): void {
        this.dialogRef.close(null);
    }

}