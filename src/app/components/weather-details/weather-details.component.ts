import { Constant } from './../../Configration/Constant';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
  providers: [WeatherService, Constant]
})
export class WeatherDetailsComponent implements OnInit {
  name: string;
  pressure: number;
  humidity: number;
  selected: any;
  isDisplay: boolean;
  loading: boolean;
  q: string;
  msg: string

  constructor(
    private service: WeatherService,
    private constant: Constant,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.getWeatherData()

  }

  // change City
  selectCity(data) {
    if (data.length === 3) {
      this.getWeatherData()
    }
  }



  // get weather Data
  getWeatherData() {
    try {
      this.spinner.show();
      this.q = this.q == undefined ? "london" : this.selected;
      let appid = this.constant.key;
      this.service.postWeather(this.q, appid).subscribe(data => {
        if (data.cod != 404 && data.cod == 200) {
          this.spinner.hide();
          this.isDisplay = true
          this.name = data.name
          this.pressure = data.main.pressure
          this.humidity = data.main.humidity
        }
      },
        error => {
          console.log("ddddd")
          this.spinner.hide();
          this.isDisplay = false
        }

      )
    }
    catch (excep) {
      this.isDisplay = false
      console.log(excep);
    }
  }

  addFav() {
    localStorage.setItem('city', JSON.stringify(this.selected));
  }



}
