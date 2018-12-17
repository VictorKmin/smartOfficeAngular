import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RoomDetailComponent} from '../room-detail/room-detail.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  constructor(private http: HttpClient,
              private RoomDetail: RoomDetailComponent
  ) {
  }

  @Input() room;

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
    (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=${this.room.temp}`).subscribe(value => {
      console.log(value);
    });
  }

  turnOff() {
    this.http.get
    (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=0`).subscribe(value => {
      console.log(value);
    });
    this.room.status = 'Always OFF';
  }

  makeChart(roomId) {
    this.RoomDetail.chacngeChart(1, roomId);
    this.RoomDetail.isShowDetail = true;
  }
}
