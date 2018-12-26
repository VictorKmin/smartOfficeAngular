import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  constructor(private http: HttpClient) {
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
    console.log(this.room.auto_mode);
    if (this.room.auto_mode) {
      this.http.get
      (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=0`).subscribe(value => {
        console.log(value);
      });
    } else {
      this.http.get
      (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=${this.room.temp}`).subscribe(value => {
        console.log(value);
      });
    }
  }

  makeChart(roomId) {
    console.log(roomId);
    this.chooseRoom.emit(roomId);
  }
}
