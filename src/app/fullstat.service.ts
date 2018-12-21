import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FullstatService {

  constructor(private http: HttpClient) {
  }

  getStatisticByDate(body) {
    console.log(body);
    return this.http.post(`http://192.168.0.131:5000/stat/full`, body);
    // return this.http.post(`http://192.168.1.120:5000/stat/full`, body);
  }
}
