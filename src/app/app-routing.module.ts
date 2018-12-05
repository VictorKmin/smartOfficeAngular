import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {AllRoomsComponent} from './all-rooms/all-rooms.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
  {path: '', component: AllRoomsComponent},
  {
    path: 'room/:id',
    component: RoomDetailComponent
  },
  {
    path: 'error/:code',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
