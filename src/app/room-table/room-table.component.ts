import { Component, OnInit, ViewChild, ViewChildren, ComponentFactory, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { RoomDetailsComponent } from './room-details/room-details.component';
import { NewRoomDialogComponent } from './new-room-dialog/new-room-dialog.component';
import { Element } from './room-table.interface';

import * as _ from 'lodash';

@Component({
  selector: 'room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.css']
})
export class RoomTableComponent implements OnInit {

  constructor(
    private resolver: ComponentFactoryResolver,
    public dialog: MatDialog) { }

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

  // Filtering of rows based on user input
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // Insertion of a new row with room details
  expandRow(uri: string) {
    // Get index from the URI
    var uris = _.map(this.dataSource.data, x => x.uri);
    var index = uris.indexOf(uri);

    // Adjust index if using paginator
    if(this.paginator){
      var pageSize = this.paginator.pageSize;
      var pageIndex = this.paginator.pageIndex;
      var shiftFactor = pageSize*pageIndex;
      index = index-shiftFactor;
    };

    // Close expanded
    this.closeExpanded();

    if (this.expandedRow === index) {
      this.expandedRow = null;
    } else {
      const container = this.rowContainers.toArray()[index];
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(RoomDetailsComponent);
      const detailComponent = container.createComponent(factory);

      detailComponent.instance.URI = uri;
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

  displayEditTools(ev){
    // console.log(ev);
  }

  closeExpanded(){
    if (this.expandedRow != null) {
      // clear old content
      this.rowContainers.toArray()[this.expandedRow].clear();
    }
  }

  addRoomDialog(): void{
    let dialogRef = this.dialog.open(NewRoomDialogComponent, {
      width: '500px',
      data: ELEMENT_DATA
    });

    dialogRef.afterClosed().subscribe(result => {
      var data: Element = result;

      // Create dummy URI for now (should be generated by backend)
      data.uri = this.createURI();

      // Append to dataSource
      this.dataSource.data.push(data);

      // Refresh data
      this.dataSource.paginator = this.paginator;
    });
  }

  log(ev){
    console.log(ev);
  }

  private createURI(){
    function pad(n, width, z?) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    var sampleURI: string = this.dataSource.data[0].uri;
    var id = sampleURI.split('/').pop();
    var decimals = id.length;
    var namespace = sampleURI.replace(new RegExp(id,"g"),'');

    var newMax = _.chain(this.dataSource.data)
      .map(x => x.uri.split('/').pop())
      .map(x => parseInt(x))
      .reduce((a,b) => Math.max(a, b))
      .value()+1;
    
    var newIndex = pad(newMax,decimals);

    return namespace+newIndex;
  }

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