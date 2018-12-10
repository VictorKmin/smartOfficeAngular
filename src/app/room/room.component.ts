import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  @Input() room;

  currentOrLast = 'current';

  plusTemp() {
    this.room.temp++;
  }

  minusTemp() {
    this.room.temp--;
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

  ngOnInit(): void {
    if (!this.room.isalive) {
      this.currentOrLast = 'last';
    }
  }
}
