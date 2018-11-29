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
  ) {}

  time = [];
  temp = [];
  chart = [];

  roomId = this.route.snapshot.params['id'];

  ngOnInit() {
    this.fullStat.getStatistic(this.roomId).subscribe((res: Data[]) => {
      console.log(res);
      res.forEach(y => {
        this.temp.push(y.room_temp);
        this.time.push(y.time);
      });
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
    });
  }
}
