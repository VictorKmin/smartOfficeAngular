import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FullstatService {

  constructor(private http: HttpClient) {
  }

  getStatistic(roomid) {
    return this.http.get(`http://192.168.0.131:5000/stat/full?id=${roomid}`);
  }

  getStatisticByDate(body) {
    return this.http.post(`http://192.168.0.131:5000/stat/full`, body);
  }
}
