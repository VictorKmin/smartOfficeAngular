import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';
import {Data} from './Data';
import * as moment from 'moment';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnChanges {
  constructor(private route: ActivatedRoute, private  fullStat: FullstatService) {
  }

  @Input() roomId;
  time = [];  // YYYY.MM.DD HH:MM:SS
  temp = [];
  tempChart: Array<any> = [];

  humidTime = [];  // YYYY.MM.DD HH:MM:SS
  humidit = [];
  humidityChart: Array<any> = [];

  co2Time = [];  // YYYY.MM.DD HH:MM:SS
  co2 = [];
  co2Chart: Array<any> = [];

  isShowDetail = false;

  ngOnChanges(changes) {
    if ('roomId' in changes && this.roomId) {
      this.isShowDetail = true;
      this.chacngeChart(1, this.roomId);
    }
  }

  /**
   * This method build chart from times and temperature
   */
  buildChart(time, data, canvasID) {
    Chart.Line(canvasID, {
      data: {
        labels: time,
        datasets: [
          {
            label: canvasID,
            data: data,
            borderColor: '#1dba9c',
            fill: false,
            lineTension: .15,
            pointRadius: 2,
          }
        ]
      },
      options: {
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

    const data = this.fullStat.getStatisticByDate(date);
    console.log(data);

    this.dataController(data);

    this.buildChart(this.time, this.temp, 'temperature');
    this.buildChart(this.humidTime, this.humidit, 'humidity');
    this.buildChart(this.co2Time, this.co2, 'co2');

  }
}
