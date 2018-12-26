import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private socket: Socket) {
  }

  ev = this.socket.fromEvent('rooms');

  firstLoad() {
    this.socket.emit('getRoom');
    return this.socket.fromEvent('rooms');
  }

}

