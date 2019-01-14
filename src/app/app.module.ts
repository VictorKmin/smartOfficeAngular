import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RoomComponent} from './room/room.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AllRoomsComponent} from './all-rooms/all-rooms.component';
import {FullstatService} from './fullstat.service';
import {RoomService} from './room.service';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

const config: SocketIoConfig = {url: 'http://192.168.0.131:5000', options: {}};

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

    BrowserModule,
    BrowserAnimationsModule,

    SocketIoModule.forRoot(config)
  ],
  providers: [
    FullstatService,
    MatDatepickerModule,
    RoomDetailComponent,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
