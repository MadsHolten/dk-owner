import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'room-property-table',
  styleUrls: ['room-property-table.component.css'],
  templateUrl: 'room-property-table.component.html',
})
export class RoomPropertyTableComponent {
  displayedColumns = ['key', 'label', 'value'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface Element {
  label: string;
  key: string;
  value: string;
}

const ELEMENT_DATA: Element[] = [
  {key: "prop:area", label: 'Area', value: '12 m2'},
  {key: "prop:occupantLoad", label: 'Occupant load', value: '2'}
];