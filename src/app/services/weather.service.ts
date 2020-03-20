
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  protected URL = 'http://api.openweathermap.org/data/2.5/weather';
  constructor(
    private http: HttpClient,

  ) { }


  postWeather(q: any, appid: any): Observable<any> {
    return this.http.get<any>(this.URL + "?q=" + q + "&appid=" + appid)
  }

}
