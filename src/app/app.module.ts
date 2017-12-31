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
         MatIconModule } from '@angular/material';

// Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { RoomTableComponent } from './room-table/room-table.component';
import { RoomDetailsComponent } from './room-table/room-details/room-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomTableComponent,
    RoomDetailsComponent
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
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RoomDetailsComponent]
})
export class AppModule { }
