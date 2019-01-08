import {Component, OnInit} from '@angular/core';
import {AllRoomService} from '../allRoom.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  constructor(private roomService: AllRoomService) {
  }

  rooms: any;

  selectedRoomId;

  ngOnInit() {
    this.roomService.firstLoad().subscribe(doc => {
      this.rooms = doc;
      console.log(doc);
    });
  }

  selectRoom(id) {
    this.selectedRoomId = id;
  }
}

