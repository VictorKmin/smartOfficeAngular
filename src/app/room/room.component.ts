import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RoomService} from '../room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  constructor(private http: HttpClient, private roomService: RoomService) {
  }

  @Input() room;
  @Output() chooseRoom = new EventEmitter<any>();

  plusTemp() {
    this.room.temp++;
    this.changeTemp();
  }

  minusTemp() {
    this.room.temp--;
    this.changeTemp();
  }

  changeTemp() {
    const temp = this.room.auto_mode ? 0 : this.room.temp;
    this.roomService.changeTemp(this.room.id, temp);
  }

  makeChart(roomId) {
    console.log(roomId);
    this.chooseRoom.emit(roomId);
  }

  ngOnInit(): void {
    this.roomService.getTemp()
      .subscribe(room => {
        if (this.room.id === room.id) {
          this.room.auto_mode = room.auto_mode;
          this.room.heater_status = room.heater_status;
          this.room.humidity = room.humidity;
          this.room.room_temp = room.room_temp;
        }
      });
  }
}
