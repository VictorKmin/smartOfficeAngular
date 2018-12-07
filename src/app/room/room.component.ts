import {Component, Input, OnInit} from '@angular/core';
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

  // checkIsModuleAlive(isAlive) {
  //   if (isAlive) {
  //     const room = document.getElementById(`room`);
  //     room.style.background = '#A7A7A7';
  //   }
  // }

  plusTemp() {
    this.room.temp++;
  }

  minusTemp() {
    this.room.temp--;
  }

  sendTempOrder() {
    console.log(`ТУТ БУДЕ СЛАТИСЬ ЗАПИТ НА БЕК ДЯЛ ЗМІНИ ТЕМПЕРАТУРИ ДЛЯ КІМНАТИ НОМЕР ${this.room.id} ДО ${this.room.temp}`);

    this.http.get
    (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=${this.room.temp}`).subscribe(value => {
      console.log(value);
    });
  }

  turnOff() {
    console.log(`ТУТ БУДЕ СЛАТИСЬ ЗАПИТ НА БЕК ДЯЛ ЗМІНИ ТЕМПЕРАТУРИ ДЛЯ КІМНАТИ НОМЕР ${this.room.id} ДО 0`);
    this.http.get
    (`http://192.168.0.131:5000/api/settemp?id=${this.room.id}&temp=0`).subscribe(value => {
      console.log(value);
    });
    this.room.status = 'Always OFF';
  }

  // ngOnInit() {
  //   this.checkIsModuleAlive(this.room.isalive);
  // }

}
