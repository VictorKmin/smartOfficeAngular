import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class FullstatService {

  constructor(private socket: Socket) {
  }

  getStatisticByDate(body) {
    console.log(body);
    this.socket.emit('buildChart', body);
    return this.socket.fromEvent('charts');
  }
}
