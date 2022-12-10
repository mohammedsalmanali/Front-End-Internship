import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WheatherService {

  constructor(private http:HttpClient) { }

  getWheatherDAta(lat:any,lng:any){
    var url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=e8c05d42fa99e65de05c954c4e036c08`
    return this.http.get<any>(url)
  }
}
