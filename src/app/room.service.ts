import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }

  getRooms() {
    return this.http.get('http://192.168.0.131:5000/stat');
  }

}

