import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { FullstatComponent } from './fullstat/fullstat.component';
import {FullstatService} from './fullstat.service';

const routes = [
  {path: '', component: AllRoomsComponent},
  {path: 'stat', component: FullstatComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    AllRoomsComponent,
    FullstatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [FullstatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
