import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import * as _ from 'lodash';

import { Element } from '../room-table.interface';
import { UniqueValidator } from './unique.validator';
import { IsNumberValidator } from './is-number.validator';
import { IsPositiveValidator } from './is-positive.validator';

@Component({
  selector: 'app-new-room-dialog',
  templateUrl: './new-room-dialog.component.html',
  styleUrls: ['./new-room-dialog.component.css']
})
export class NewRoomDialogComponent implements OnInit {

  public roomForm: FormGroup;
  private existingIds: string[] = [];
  private existingIdsFiltered: Observable<string[]>;
  private existingTypes: string[] = [];
  private existingTypesFiltered: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    _.each(this.data, x => {
      // Must be unique
      if(this.existingTypes.indexOf(x.type) === -1){
        this.existingTypes.push(x.type);
      }
      this.existingIds.push(x.id);
    })

    this.roomForm = this.fb.group({
        id: ['', [Validators.required, UniqueValidator(this.existingIds) ]],
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        area: ['', [IsNumberValidator(), IsPositiveValidator()]]
    });

    // Filter ids as the user types
    this.existingIdsFiltered = this.roomForm.valueChanges
      .pipe(
        startWith(''),
        map(val => this.extractObj(val,'id')),
        map(id => this.filter(id, this.existingIds))
      );
    
    // Filter types as the user types
    this.existingTypesFiltered = this.roomForm.valueChanges
    .pipe(
      startWith(''),
      map(val => this.extractObj(val,'type')),
      map(type => {
        return this.filter(type, this.existingTypes)})
    );
  }

  extractObj(value: any, obj): string {
    return value && typeof value === 'object' ? value[obj] : value;
  }

  filter(val: string, list): string[] {
    return list
      .filter(option => option.toString().toLowerCase().indexOf(val.toString().toLowerCase()) === 0);
  }

  onAreaChange(value){
    if(value.indexOf(',') !== -1){
      // replace comma with dot
      var newVal = value.replace(',', '.');
      this.roomForm.controls['area'].setValue(newVal)
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onCloseConfirm(ev) {
    var data: Element = ev.value;
    // Append m2 to area
    if(data.area){
      data.area = data.area+=' m2';
    }
    this.dialogRef.close(data);
  }

  onCloseCancel() {
      this.dialogRef.close(null);
  }

  backdropClick() {
      this.dialogRef.close(null);
  }

}
