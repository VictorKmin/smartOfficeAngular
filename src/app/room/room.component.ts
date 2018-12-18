import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  constructor(private http: HttpClient,
                ) {
  }

  @Input() room;
  @Output() chooseRoom = new EventEmitter<any>();

  plusTemp() {
    this.room.temp++;
    this.sendTempOrder();
  }

  minusTemp() {
    this.room.temp--;
    this.sendTempOrder();

  }

  sendTempOrder() {
    this.http.get
    // (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=${this.room.temp}`).subscribe(value => {
    (`http://192.168.1.120:5000/api/settemp?id=${this.room.id}&temp=${this.room.temp}`).subscribe(value => {
      console.log(value);
    });
  }

  turnOff() {
    this.http.get
    // (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=0`).subscribe(value => {
    (`http://192.168.1.120:5000/api/settemp?id=${this.room.id}&temp=0`).subscribe(value => {
      console.log(value);
    });
    this.room.status = 'Always OFF';
  }

  makeChart(roomId) {
    console.log(roomId);
    this.chooseRoom.emit(roomId);
    // this.RoomDetail.chacngeChart(1, roomId);
  }

}
