import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';
import {Data} from './Data';
import * as moment from 'moment';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnChanges, OnInit {
// export class RoomDetailComponent implements OnChanges {
  @Input() roomId;
  firstPointStart;
  widthOfBlock;

  countOfPaginationDays;
  startingPagination;
  finishedPagination;

  // All chart options
  options = {
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
  };

  tempTime = [];  // YYYY.MM.DD HH:MM:SS
  temp = [];

  humidTime = [];  // YYYY.MM.DD HH:MM:SS
  humidit = [];

  co2Time = [];  // YYYY.MM.DD HH:MM:SS
  co2 = [];

  isShowDetail = false;
  isPaginationDownAvalible;

  charts = {};

  constructor(private route: ActivatedRoute, private  fullStat: FullstatService) {
  }

  ngOnChanges(changes) {
    if ('roomId' in changes && this.roomId) {
      this.isShowDetail = true;
      this.countOfPaginationDays = 1;
      this.startingPagination = 1;
      this.finishedPagination = 0;
      this.changeChart(1, 0, this.roomId);
    }
  }

  /**
   * This method build chart from times and temperature
   */
  buildChart(time, data, canvasID) {
    if (canvasID in this.charts) {
      this.charts[canvasID].destroy();
    }
    this.charts[canvasID] = Chart.Line(canvasID, {
      data: {
        labels: time,
        datasets: [
          {
            label: canvasID,
            data: data,
            borderColor: '#1dba9c',
            fill: false,
          }
        ]
      },
      options: this.options
    });
  }

  changeDaysCount(daysCount) {
    console.log(daysCount);
    this.countOfPaginationDays = daysCount;
    this.startingPagination = daysCount;
    this.finishedPagination = 0;
    this.changeChart(daysCount, 0, undefined);
  }

  /**
   * This method works, when we press button on html page.
   * Take date from datepicker, trim it, build another object
   * Then we insert it into local storage and build chart
   */
  changeChart(dayOfStartSearch, dayOfFinishSearch, roomId) {
    this.tempTime = [];
    this.temp = [];
    this.humidit = [];
    this.humidTime = [];
    this.co2Time = [];
    this.co2 = [];

    if (roomId) {
      localStorage.setItem('roomId', roomId);
    } else {
      roomId = localStorage.getItem('roomId');
    }

    this.roomId = roomId;
    const infoAboutSearch = {
      dayOfStartSearch,
      dayOfFinishSearch,
      roomId
    };

    this.timeLine();
    this.main(infoAboutSearch);
  }

  /**
   * This method take array statistic, iterate it
   * Then we push temperature to "temp" array and dates to "tempTime" array
   * @param res - array of statistic from back-end response.
   */
  private dataController(res: Data) {
    const {humidity, temperature, co2} = res;
    temperature.forEach(temperatureObject => {
      this.temp.push(temperatureObject.room_temp);
      this.tempTime.push(moment(temperatureObject.fulldate, 'YYYY-MM-DD HH:mm:ss'));
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
   * @param info - information about room (day of start searching, day of finish searching, room id)
   */
  main(info) {
    this.fullStat.getStatisticByDate(info)
      .pipe(take(1))
      .subscribe(res => {
        console.log(res);
        this.dataController(res.message);
        this.buildChart(this.tempTime, this.temp, 'temperature');
        this.buildChart(this.humidTime, this.humidit, 'humidity');
        this.buildChart(this.co2Time, this.co2, 'co2');
      });
  }

  paginationMinus() {
    this.finishedPagination = this.startingPagination;
    this.startingPagination = this.startingPagination + this.countOfPaginationDays;
    this.changeChart(this.startingPagination, this.finishedPagination, undefined);
  }

  paginationPlus() {
    this.startingPagination = this.finishedPagination;
    this.finishedPagination = this.startingPagination - this.countOfPaginationDays;
    this.changeChart(this.startingPagination, this.finishedPagination, undefined);
  }

  timeLine() {
    this.fullStat.getCountOfDays()
      .pipe(take(1))
      .subscribe(datesArray => {
        const countOfBlocks = Math.ceil(datesArray.length / this.countOfPaginationDays);
        this.firstPointStart = 100 - (100 / countOfBlocks);
        const paginationNumber = this.startingPagination / this.countOfPaginationDays;
        const currentPosition = 100 - (this.firstPointStart);
        this.firstPointStart = 100 - currentPosition * paginationNumber;
        this.widthOfBlock = 100 / countOfBlocks;
        (countOfBlocks === paginationNumber) ? this.isPaginationDownAvalible = false : this.isPaginationDownAvalible = true;
      });
  }

  ngOnInit() {
    this.fullStat.getNewestStatistic().subscribe(value => {
      const {fulldate, humidity, room_temp, co2, id} = value;

      if (this.finishedPagination === 0 && this.roomId === id) {

        this.charts['temperature'].data.datasets[0].data.shift();
        this.charts['temperature'].data.datasets[0].data.push(room_temp);
        this.charts['temperature'].data.labels.shift();
        this.charts['temperature'].data.labels.push(moment(fulldate, 'YYYY-MM-DD HH:mm:ss'));

        this.charts['humidity'].data.datasets[0].data.shift();
        this.charts['humidity'].data.datasets[0].data.push(humidity);
        this.charts['humidity'].data.labels.shift();
        this.charts['humidity'].data.labels.push(moment(fulldate, 'YYYY-MM-DD HH:mm:ss'));

        this.charts['co2'].data.datasets[0].data.shift();
        this.charts['co2'].data.datasets[0].data.push(co2);
        this.charts['co2'].data.labels.shift();
        this.charts['co2'].data.labels.push(moment(fulldate, 'YYYY-MM-DD HH:mm:ss'));


        this.charts['temperature'].update();
        this.charts['humidity'].update();
        this.charts['co2'].update();
      }
    });
  }
}
