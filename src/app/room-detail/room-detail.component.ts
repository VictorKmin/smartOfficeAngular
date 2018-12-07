import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';
import {Data} from './Data';
import {Response} from '../Response';
import {MatInput} from '@angular/material';
import * as moment from 'moment';

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

  /**
   * This method build chart from times and temperature
   */
  buildChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.time,
        datasets: [
          {
            data: this.temp,
            borderColor: '#1dba9c',
            fill: false
          }
        ]
      },
      options: {
        elements: {
          line: {
            tension: .15, // disables bezier curves
          }
        },
        legend: {
          display: false
        },
        // https://codepen.io/shivabhusal/pen/ayyVeL?editors=1010 - how I do this
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'MM-DD HH:MM'
              }
            },
            distribution: 'linear'
          }],
          yAxes: [{
            display: true,
          }],
        }
      }
    });
  }

  /**
   * This method works, when we press button on html page.
   * Take date from datepicker, trim it, build another object
   * Then we insert it into local storage and build chart
   */
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

  /**
   * This method take array statistic, iterate it
   * Then we push temperature to "temp" array and dates to "time" array
   * @param res - array of statistic from back-end response.
   */
  private dataController(res: Data[]) {
    res.forEach(respObject => {
      this.temp.push(respObject.room_temp);
      this.time.push(moment(respObject.fulldate, 'YYYY-MM-DD HH:mm:ss'));
    });
  }

  /**
   * This method checks if we have an error.
   * If error present - we take Error code and render error page
   * @param date - date from LocalStorage
   */
  main(date) {
    this.fullStat.getStatisticByDate(date).subscribe((res: Response) => {
      const {success, message: data} = res;
      console.log(data);
      if (!success) {
        localStorage.removeItem('date');
        this.router.navigateByUrl(`/error/${data}`);
      } else {
        this.dataController(data);
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
