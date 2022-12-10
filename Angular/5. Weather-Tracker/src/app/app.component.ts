import { Component,Pipe } from '@angular/core';
import { WheatherService } from './wheather.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare var google: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// @Pipe({ name: 'safe' })
export class AppComponent {
  constructor(private whthrService: WheatherService) {
   }
  wheatherDetails:any
  lat = 10.7867
  lng = 76.65
  title = 'weather-tracker';
  options: any;
  overlays: any = []
  map = google.maps.Map;
  keralaDistricts = [
    {
      name: 'Kasaragod',
      lat: '12.49',
      lng: '74.98'
    },
    {
      name: 'Wayanadu',
      lat: '11.6854',
      lng: '76.1320'
    },
    {
      name: 'Kannur',
      lat: '11.8745',
      lng: '75.3704'
    },
    {
      name: 'Malappuram',
      lat: '11.0510',
      lng: '76.0711'
    },
    {
      name: 'Kozhikode',
      lat: '11.25',
      lng: '75.78'
    },
    {
      name: 'Palakkad',
      lat: '10.7867',
      lng: '76.65'
    },
    {
      name: 'Ernakulam',
      lat: '9.98',
      lng: '76.29'
    },
    {
      name: 'Idukki',
      lat: '9.91',
      lng: '77.10'
    },
    {
      name: 'Kottayam',
      lat: '10.7867',
      lng: '76.65'
    },
    {
      name: 'Alappuzha',
      lat: '9.49',
      lng: '76.38'
    },
    {
      name: 'Pathanamthitta',
      lat: '9.26',
      lng: '76.78'
    },

    {
      name: 'Kollam',
      lat: '8.89',
      lng: '76.61'
    },
    {
      name: 'Thiruvananthapuram',
      lat: '8.52',
      lng: '76.93'
    },
    {
      name: 'Thrissur',
      lat: '10.52',
      lng: '76.21'
    }
  ]
  singleDistrict:any
  setMap(event: any) {
    this.map = event.map;
    console.log({ eventaa: event.map })
  }
  ngOnInit() {
    this.singleDistrict={
      name: 'Palakkad',
      lat: 10.7867,
      lng: 76.65
    }
    this.options = {
      center: { lat: Number(this.lat), lng: Number(this.lng) },
      zoom: 16
    }
    this.getWheatherDetails(this.lat,this.lng)

  }

  getWheatherDetails(lat:any,lng:any){
    this.whthrService.getWheatherDAta(lat, lng).subscribe((res) => {
      this.wheatherDetails =res

      this.map.setCenter({
        lat: Number(lat),
        lng: Number(lng)
      });
    })
  }

  
  selectDistrict() {
    if(this.singleDistrict){
      this.lat = this.singleDistrict.lat
      this.lng = this.singleDistrict.lng
      if (this.singleDistrict) {
        this.getWheatherDetails(this.lat,this.lng)
      }

    }
  }


}

