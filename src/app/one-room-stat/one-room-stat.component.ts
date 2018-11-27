import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-one-room-stat',
  templateUrl: './one-room-stat.component.html',
  styleUrls: ['./one-room-stat.component.css']
})
export class OneRoomStatComponent implements OnInit {
  @Input() oneRoomStat;

  newTime;

  constructor() {
  }

  ngOnInit() {
    const date = new Date();
    date.setTime(this.oneRoomStat.time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    this.newTime = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    console.log(this.newTime);
  }

}
