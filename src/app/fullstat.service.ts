import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FullstatService {

  constructor(private http: HttpClient) {
  }

  getStatistic() {
    return this.http.get
    (`http://192.168.0.131:5000/stat/full?id=2`).subscribe(allStat => {
      console.log(allStat);
    });
  }
}
