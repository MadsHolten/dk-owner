import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatButtonModule, 
         MatCheckboxModule,
         MatTableModule,
         MatSortModule,
         MatInputModule,
         MatFormFieldModule,
         MatCardModule,
         MatPaginatorModule,
         MatIconModule,
         MatDialogModule,
         MatAutocompleteModule } from '@angular/material';

// Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';

// Room table component
import { RoomTableComponent } from './room-table/room-table.component';
import { RoomDetailsComponent } from './room-table/room-details/room-details.component';
import { NewRoomDialogComponent } from './room-table/new-room-dialog/new-room-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomTableComponent,
    RoomDetailsComponent,
    NewRoomDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RoomDetailsComponent,NewRoomDialogComponent]
})
export class AppModule { }
