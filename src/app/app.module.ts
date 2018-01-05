import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Interceptor
import { AuthInterceptor } from './services/auth.interceptor';

// Local storage
import { WebStorageModule } from 'ngx-store';

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
         MatAutocompleteModule,
         MatToolbarModule,
         MatExpansionModule } from '@angular/material';

// Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';

// Room table component
import { RoomTableComponent } from './room-table/room-table.component';
import { RoomDetailsComponent } from './room-table/room-details/room-details.component';
import { NewRoomDialogComponent } from './room-table/new-room-dialog/new-room-dialog.component';
import { RoomPropertyTableComponent } from './room-table/room-details/room-property-table/room-property-table.component';

// Settings component
import { SettingsComponent } from './settings/settings.component';

// Pipes
import { CDTUnitsPipe } from './pipes/cdt-units.pipe';

// Dialogs
import { ConfirmDialogComponent } from './dialogs/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomTableComponent,
    RoomDetailsComponent,
    NewRoomDialogComponent,
    RoomPropertyTableComponent,
    CDTUnitsPipe,
    ConfirmDialogComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    WebStorageModule,
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
    MatToolbarModule,
    MatExpansionModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RoomDetailsComponent,NewRoomDialogComponent,ConfirmDialogComponent]
})
export class AppModule { }
