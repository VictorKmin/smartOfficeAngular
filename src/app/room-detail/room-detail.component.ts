import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';
import {Data} from './Data';
import {MatInput} from '@angular/material';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @ViewChild('from', {read: MatInput}) from: MatInput;
  @ViewChild('to', {read: MatInput}) to: MatInput;

  constructor(private route: ActivatedRoute, private  fullStat: FullstatService) {
  }

  time = [];  // YYYY.MM.DD HH:MM
  temp = [];
  chart: Array<any> = [];
  // years = [];
  // months = [];
  // days = [];
  // hours = [];
  // minutes = [];
  roomId = this.route.snapshot.params['id'];

  fromYear: any;
  fromMonth: any;
  fromDay: any;
  toYear: any;
  toMonth: any;
  toDay: any;

  reset() {
    this.from.value = '';
    this.to.value = '';
  }

  buildChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.time,
        datasets: [
          {
            data: this.temp,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  chacngeChart() {
    this.time = [];
    this.temp = [];
    this.chart = [];

    console.log('********************');
    console.log(this.from.value);
    console.log(this.to.value);
    console.log('********************');

    this.fromYear = new Date(this.from.value).getFullYear();
    this.fromMonth = new Date(this.from.value).getMonth();
    this.fromDay = new Date(this.from.value).getDay();
    this.toYear = new Date(this.to.value).getFullYear();
    this.toMonth = new Date(this.to.value).getMonth();
    this.toDay = new Date(this.to.value).getDay();

    const body = {
      from: `${this.fromYear}-${this.fromMonth}-${this.fromDay}`,
      to: `${this.toYear}-${this.toMonth}-${this.toDay}`,
      roomId: this.roomId
    };

    localStorage.setItem('date', JSON.stringify(body));

    this.fullStat.getStatisticByDate(body).subscribe((res: Data[]) => {
      console.log(res);
      this.dateController(res);
      this.buildChart();
    });
  }

  private dateController(res: Data[]) {
    res.forEach(respObject => {
      this.temp.push(respObject.room_temp);

      const [date, time] = respObject.fulldate.split(' ');
      // const [year, month, day] = date.split('-');
      // const [hour, minute] = time.split(':');
      this.time.push(`${date} ${time}`);
      // this.time.push(`${year}.${month}.${day} ${hour}:${minute}`);
      // this.years.push(year);
      // this.months.push(month);
      // this.days.push(day);
      // this.hours.push(hour);
      // this.minutes.push(minute);
    });
  }

  ngOnInit() {
    const date = localStorage.getItem('date');
    this.fullStat.getStatisticByDate(JSON.parse(date)).subscribe((res: Data[]) => {
      console.log(res);
      this.dateController(res);
      this.buildChart();
    });
  }
}
