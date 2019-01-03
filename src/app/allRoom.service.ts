import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AllRoomService {

  constructor(private socket: Socket) {
  }

  firstLoad() {
    this.socket.emit('getRoom');
    return this.socket.fromEvent('rooms');
  }
}

