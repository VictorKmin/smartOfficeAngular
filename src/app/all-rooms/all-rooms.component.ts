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

  rooms: Object = [];

  ngOnInit() {
    this.roomService.getRooms().subscribe(response => {
      this.rooms = response;
    });
  }
}

