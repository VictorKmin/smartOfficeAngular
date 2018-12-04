import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RoomComponent} from './room/room.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AllRoomsComponent} from './all-rooms/all-rooms.component';
import {FullstatService} from './fullstat.service';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule, MatSliderModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    AllRoomsComponent,
    RoomDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,

    MatNativeDateModule,
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    FullstatService,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
