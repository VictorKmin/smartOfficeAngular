import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';

const routes = [
  {path: '', component: AllRoomsComponent},
  // {path: 'users', component: UsersPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    AllRoomsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
