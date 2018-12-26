import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  constructor(private roomService: RoomService) {
  }

  rooms = this.roomService.ev;
  selectedRoomId;

  ngOnInit() {
    this.roomService.firstLoad().subscribe(doc => {
      this.rooms = doc;
      console.log(doc);
    });
  }

  selectRoom(id) {
    console.log(id);
    this.selectedRoomId = id;
  }
}

