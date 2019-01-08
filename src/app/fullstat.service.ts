import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class FullstatService {

  constructor(private socket: Socket) {
  }

  resp;

  getStatisticByDate(body) {
    console.log(body);
    this.socket.emit('buildChart', body);

    this.socket.fromEvent('charts').subscribe(res => {
      console.log(res);
      this.resp = res.message;
    });

    return this.resp;
  }
}
