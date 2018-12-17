import {Component, ViewChild} from '@angular/core';
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
export class RoomDetailComponent {
  constructor(private route: ActivatedRoute, private  fullStat: FullstatService, private router: Router) {
  }

  @ViewChild('from', {read: MatInput}) from: MatInput;
  @ViewChild('to', {read: MatInput}) to: MatInput;

  time = [];  // YYYY.MM.DD HH:MM:SS
  humidTime = [];  // YYYY.MM.DD HH:MM:SS
  temp = [];
  humidit = [];
  tempChart: Array<any> = [];
  humidityChart: Array<any> = [];

  fromYear: any;
  fromMonth: any;
  fromDay: any;
  toYear: any;
  toMonth: any;
  toDay: any;
  searchTime: any;
  isShowDetail: boolean;

  /**
   * This method build chart from times and temperature
   */
  buildChart(time, data, canvasID, chartName) {
    chartName = new Chart(canvasID, {
      type: 'line',
      data: {
        labels: time,
        datasets: [
          {
            data: data,
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
        }
      }
    });
  }

  /**
   * This method works, when we press button on html page.
   * Take date from datepicker, trim it, build another object
   * Then we insert it into local storage and build chart
   */
  chacngeChart(days, roomId) {
    console.log(this.isShowDetail);
    this.isShowDetail = true;
    console.log(this.isShowDetail);

    this.time = [];
    this.temp = [];
    this.humidit = [];
    this.tempChart = [];
    this.humidTime = [];

    if (roomId) {
      localStorage.setItem('roomId', roomId);
    } else {
      roomId = localStorage.getItem('roomId');
    }
    [this.fromDay, this.fromMonth, this.fromYear] = new Date(Date.now()).toLocaleDateString().split('.');
    [this.toDay, this.toMonth, this.toYear] = new Date(Date.now()).toLocaleDateString().split('.');

    this.searchTime = new Date(Date.now()).toLocaleTimeString();

    (days) ? this.fromDay = this.fromDay - days : this.fromMonth = this.fromMonth - 1;
    const body = {
      from: `${this.fromYear}-${this.fromMonth}-${this.fromDay} ${this.searchTime}`,
      to: `${this.toYear}-${this.toMonth}-${this.toDay} ${this.searchTime}`,
      roomId
    };

    this.main(body);
  }

  /**
   * This method take array statistic, iterate it
   * Then we push temperature to "temp" array and dates to "time" array
   * @param res - array of statistic from back-end response.
   */
  private dataController(res: Data) {
    const {humidity, temperature} = res;
    temperature.forEach(temperatureObject => {
      this.temp.push(temperatureObject.room_temp);
      this.time.push(moment(temperatureObject.fulldate, 'YYYY-MM-DD HH:mm:ss'));
    });
    humidity.forEach(humidityOnject => {
      this.humidit.push(humidityOnject.humidity);
      this.humidTime.push(moment(humidityOnject.fulldate, 'YYYY-MM-DD HH:mm:ss'));
    });
  }

  /**
   * This method checks if we have an error.
   * If error present - we take Error code and render error page
   * @param date - date from LocalStorage
   */
  main(date) {
    this.fullStat.getStatisticByDate(date).subscribe((res: Response) => {
      let {success, message: data} = res;
      console.log(data);
      if (!success) {
        data = +data.slice(data.length - 2, data.length).trim();
        this.router.navigateByUrl(`/error/${data}`);
      } else {
        this.dataController(data);
        this.buildChart(this.time, this.temp, 'tempCanvas', this.tempChart);
        this.buildChart(this.humidTime, this.humidit, 'humidityCanvas', this.humidityChart);
      }
    });
  }
}
