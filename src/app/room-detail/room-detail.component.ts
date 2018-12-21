import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';
import {Data} from './Data';
import {Response} from '../Response';
import {MatInput} from '@angular/material';
import * as moment from 'moment';
import {Local} from 'protractor/built/driverProviders';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnChanges {
  constructor(private route: ActivatedRoute, private  fullStat: FullstatService, private router: Router) {
  }

  @Input() roomId;
  @ViewChild('from', {read: MatInput}) from: MatInput;
  @ViewChild('to', {read: MatInput}) to: MatInput;

  time = [];  // YYYY.MM.DD HH:MM:SS
  temp = [];
  tempChart: Array<any> = [];

  humidTime = [];  // YYYY.MM.DD HH:MM:SS
  humidit = [];
  humidityChart: Array<any> = [];

  co2Time = [];  // YYYY.MM.DD HH:MM:SS
  co2 = [];
  co2Chart: Array<any> = [];

  fromYear: any;
  fromMonth: any;
  fromDay: any;
  toYear: any;
  toMonth: any;
  toDay: any;
  searchTime: any;
  isShowDetail = false;

  ngOnChanges(changes) {
    console.log(this.roomId);
    if ('roomId' in changes && this.roomId) {
      this.isShowDetail = true;
      this.chacngeChart(1, this.roomId);
    }
  }

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
            label: canvasID,
            data: data,
            borderColor: '#1dba9c',
            fill: false
          }
        ]
      },
      options: {
        responsive: false,
        elements: {
          point: {
            radius: 2
          },
          line: {
            tension: .15, // disables bezier curves
          }
        },
        legend: {
          display: true,
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
    this.time = [];
    this.temp = [];
    this.tempChart = [];
    this.humidit = [];
    this.humidTime = [];
    this.humidityChart = [];
    this.co2Time = [];
    this.co2 = [];
    this.co2Chart = [];

    if (roomId) {
      localStorage.setItem('roomId', roomId);
    } else {
      roomId = localStorage.getItem('roomId');
    }
    const body = {
      countOfDays: days,
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
    const {humidity, temperature, co2} = res;
    temperature.forEach(temperatureObject => {
      this.temp.push(temperatureObject.room_temp);
      this.time.push(moment(temperatureObject.fulldate, 'YYYY-MM-DD HH:mm:ss'));
    });
    humidity.forEach(humidityOnject => {
      this.humidit.push(humidityOnject.humidity);
      this.humidTime.push(moment(humidityOnject.fulldate, 'YYYY-MM-DD HH:mm:ss'));
    });
    co2.forEach(co2Object => {
      this.co2.push(co2Object.co2);
      this.co2Time.push(moment(co2Object.fulldate, 'YYYY-MM-DD HH:mm:ss'));
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
        this.buildChart(this.time, this.temp, 'temperature', this.tempChart);
        this.buildChart(this.humidTime, this.humidit, 'humidity', this.humidityChart);
        this.buildChart(this.co2Time, this.co2, 'co2', this.co2Chart);
      }
    });
  }
}
