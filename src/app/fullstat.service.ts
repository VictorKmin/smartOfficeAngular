import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class FullstatService {

  constructor(private socket: Socket) {
  }

  getStatisticByDate(info) {
    this.socket.emit('buildChart', info);
    return this.socket.fromEvent('charts');
  }

  getNewestStatistic() {
    return this.socket.fromEvent('updateChart');
  }

  getCountOfDays() {
    return this.socket.fromEvent('timeLine');
  }
}
