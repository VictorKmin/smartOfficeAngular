import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {Response} from '../Response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  constructor(private roomService: RoomService, private router: Router) {
  }

  rooms: Object = [];
  selectedRoomId;
  ngOnInit() {
    this.roomService.getRooms().subscribe((response: Response) => {
      let {success, message: data} = response;
      console.log(response);
      if (!success) {
        data = +data.slice(data.length - 2, data.length).trim();
        this.router.navigateByUrl(`/error/${data}`);
      } else {
        this.rooms = data;
      }
    });
  }

  selectRoom(id) {
    console.log(id);
    this.selectedRoomId = id;
  }
}

