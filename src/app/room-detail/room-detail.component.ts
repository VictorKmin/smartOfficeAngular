import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';
import {Data} from './Data';
import {Response} from '../Response';
import {MatInput} from '@angular/material';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @ViewChild('from', {read: MatInput}) from: MatInput;
  @ViewChild('to', {read: MatInput}) to: MatInput;

  constructor(private route: ActivatedRoute, private  fullStat: FullstatService, private router: Router) {
  }

  error: String = '';
  time = [];  // YYYY.MM.DD HH:MM:SS
  temp = [];
  chart: Array<any> = [];
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

    [this.fromDay, this.fromMonth, this.fromYear] = new Date(this.from.value).toLocaleDateString().split('.');
    [this.toDay, this.toMonth, this.toYear] = new Date(this.to.value).toLocaleDateString().split('.');

    const body = {
      from: `${this.fromYear}-${this.fromMonth}-${this.fromDay}`,
      to: `${this.toYear}-${this.toMonth}-${this.toDay}`,
      roomId: this.roomId
    };

    localStorage.setItem('date', JSON.stringify(body));
    this.main(body);
  }

  private dateController(res: Data[]) {
    res.forEach(respObject => {
      this.temp.push(respObject.room_temp);
      this.time.push(respObject.fulldate.slice(0, -3));
    });
  }

  main(date) {
    this.fullStat.getStatisticByDate(date).subscribe((res: Response) => {
      const {success, message: data} = res;
      if (!success) {
        this.error = data;
        // this.router.navigateByUrl(`/error/${data}`);
      } else {
        this.dateController(data);
        this.buildChart();
      }
    });
  }

  ngOnInit() {
    let date = localStorage.getItem('date');
    if (!date) {
      date = JSON.stringify({roomId: this.roomId});
    }
    this.main(JSON.parse(date));
  }
}
