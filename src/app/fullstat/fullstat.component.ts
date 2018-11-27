import {Component, OnInit} from '@angular/core';
import {FullstatService} from '../fullstat.service';

@Component({
  selector: 'app-fullstat',
  templateUrl: './fullstat.component.html',
  styleUrls: ['./fullstat.component.css']
})
export class FullstatComponent implements OnInit {

  constructor(private fullstat: FullstatService) {
  }

  ngOnInit() {
    this.fullstat.getStatistic();
  }

}
