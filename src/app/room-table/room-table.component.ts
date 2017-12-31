import { Component, OnInit, ViewChild, ViewChildren, ComponentFactory, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { RoomDetailsComponent } from './room-details/room-details.component';

@Component({
  selector: 'room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.css']
})
export class RoomTableComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns = ['id', 'name', 'type', 'area'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChildren('tableRow', { read: ViewContainerRef }) rowContainers;
  expandedRow: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  insertComponent(index: number) {
    if (this.expandedRow != null) {
      // clear old content
      this.rowContainers.toArray()[this.expandedRow].clear();
    }

    if (this.expandedRow === index) {
      this.expandedRow = null;
    } else {
      const container = this.rowContainers.toArray()[index];
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(RoomDetailsComponent);
      const detailComponent = container.createComponent(factory);

      detailComponent.instance.URI = this.dataSource.data[index].uri;
      this.expandedRow = index;

      // Subscribe to changes in details component
      detailComponent.instance.delete.subscribe(del => {
        // Remove row if delete is true
        if(del == true){
          // Remove row
          this.dataSource.data.splice(index, 1);

          // Should then remove it from the triplestore and if something fails, reinsert the item

          // Refresh data
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }

}

export interface Element {
  name: string;
  id: string;
  type: string;
  area: string;
  uri: string;
}

const ELEMENT_DATA: Element[] = [
  {id: 'R-O1.01', name: 'Single person office', type: 'Office A', area: '12 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/001'},
  {id: 'R-O1.02', name: 'Single person office', type: 'Office A', area: '12 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/002'},
  {id: 'R-O1.03', name: 'Single person office', type: 'Office A', area: '12 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/003'},
  {id: 'R-O2.01', name: 'Two person office', type: 'Office B', area: '16 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/004'},
  {id: 'R-O2.02', name: 'Two person office', type: 'Office B', area: '16 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/005'},
  {id: 'R-R1.01', name: 'Mens room', type: 'Restroom A', area: '4 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/006'},
  {id: 'R-R1.02', name: 'Ladies room', type: 'Restroom A', area: '4 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/007'},
  {id: 'R-R2.01', name: 'Disabled', type: 'Restroom B', area: '6 m2', uri: 'http://www.someDeveloper.com/proj18001/rooms/008'}
];