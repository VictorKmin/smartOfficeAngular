import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FullstatService} from '../fullstat.service';
import {Chart} from 'chart.js';

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

  allTime = [];
  allTemp = [];

  allStat: Array<any> = [];


  chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: [19, 18, 17, 16, 15],
      datasets: [
        {
          data: [1, 2, 3, 4, 5, 6],
          borderColor: '#ffcc00',
          fill: false
        }
      ],
      // options: {
      //   legend: {
      //     display: false
      //   },
      //   scales: {
      //     xAxes: [{
      //       display: true
      //     }],
      //     yAxes: [{
      //       display: true
      //     }]
      //   }
      // }
    }
  });

  find(array) {
    array.forEach((stat) => {
      this.allTime.push(stat.time);
      this.allTemp.push(stat.room_temp);
    });
    console.log(this.allTime);
    console.log(this.allTemp);
  }

  ngOnInit() {
    const roomId = this.route.snapshot.params['id'];
    this.getStat((roomId));
  }

  getStat(roomId) {
    this.fullStat.getStatistic(roomId).subscribe((stats: Array<any>) => {
      this.allStat = stats;
      this.find(stats);
    });
  }
}
