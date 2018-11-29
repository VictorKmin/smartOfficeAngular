import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';
import {Data} from './Data';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private  fullStat: FullstatService
  ) {
  }

  time = [];  // YYYY.MM.DD HH:MM
  temp = [];
  chart = [];
  years = [];
  months = [];
  days = [];
  hours = [];
  minutes = [];
  roomId = this.route.snapshot.params['id'];

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getUniqoueDate(res) {
    res.forEach(y => {
      this.temp.push(y.room_temp);
      this.time.push(`${y.year}.${y.month}.${y.day} ${y.hour}:${y.minute}`);
      //
      this.years.push(y.year);
      this.months.push(y.month);
      this.days.push(y.day);
      this.hours.push(y.hour);
      this.minutes.push(y.minute);
      //
      this.years = this.years.filter(this.onlyUnique);
      this.months = this.months.filter(this.onlyUnique);
      this.days = this.days.filter(this.onlyUnique);
      this.hours = this.hours.filter(this.onlyUnique);
    });
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

  ngOnInit() {
    this.fullStat.getStatistic(this.roomId).subscribe((res: Data[]) => {
      console.log(res);
      this.getUniqoueDate(res);
      this.buildChart();
    });
  }
}
