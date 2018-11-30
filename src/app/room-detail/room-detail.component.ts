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

  fromYear: any;
  fromMonth: any;
  fromDay: any;
  fromHour: any;
  toYear: any;
  toMonth: any;
  toDay: any;
  toHour: any;

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getUniqoueDate() {
    this.years = this.years.filter(this.onlyUnique);
    this.months = this.months.filter(this.onlyUnique);
    this.days = this.days.filter(this.onlyUnique);
    this.hours = this.hours.filter(this.onlyUnique);
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

    const body = {
      from: `${this.fromYear}-${this.fromMonth}-${this.fromDay} ${this.fromHour}`,
      to: `${this.toYear}-${this.toMonth}-${this.toDay} ${this.toHour}`,
      roomId: this.roomId
    };
    this.fullStat.getStatisticByDate(body).subscribe((res: Data[]) => {
      //
      console.log(res);
      this.dateController(res);
      this.getUniqoueDate();
      this.buildChart();
    });
  }

  private dateController(res: Data[]) {
    res.forEach(respObject => {
      this.temp.push(respObject.room_temp);

      const [date, time] = respObject.fulldate.split(' ');
      const [year, month, day] = date.split('-');
      const [hour, minute] = time.split(':');
      this.time.push(`${year}.${month}.${day} ${hour}:${minute}`);

      this.years.push(year);
      this.months.push(month);
      this.days.push(day);
      this.hours.push(hour);
      this.minutes.push(minute);
    });
  }

  ngOnInit() {
    this.fullStat.getStatistic(this.roomId).subscribe((res: Data[]) => {
      console.log(res);
      this.dateController(res);
      this.getUniqoueDate();
      this.buildChart();
    });
  }

}
