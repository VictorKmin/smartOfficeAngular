import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import {FullstatService} from './fullstat.service';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  providers: [FullstatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
