import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private socket: Socket) {
  }

  changeTemp(roomId, temp) {
    this.socket.emit('changeTemp', {roomId, temp});
  }

  getTemp() {
    return this.socket.fromEvent('lastRoomStat');
  }
}
