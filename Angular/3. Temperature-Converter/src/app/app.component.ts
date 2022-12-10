import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  temperatureTypes: Array<string> = [ 'Celsius', 'Farenheit', 'Kelvin'];
  result: string = "--";

  temperatureForm!: FormGroup;
  degree!: FormControl;
  conversionFromType!: FormControl;
  conversionToType!: FormControl;

  get isSameConversionType(): boolean {
    return this.conversionFromType.value === this.conversionToType.value;
  }
  ngOnInit(): void {
    this.initFormControls();
    this.initForm();
  }

  initFormControls(): void {
    this.degree = new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]);
    this.conversionFromType = new FormControl("", Validators.required);
    this.conversionToType = new FormControl("", Validators.required);
  }

  initForm() :void {
    this.temperatureForm = new FormGroup({
      degree: this.degree,
      conversionFromType:  this.conversionFromType,
      conversionToType:  this.conversionToType
    });
  }

  onSubmit() :void {
    if(this.temperatureForm.valid && !this.isSameConversionType){
      this.result = this.convertTemperature(this.conversionFromType.value, this.conversionToType.value);
    }
    this.temperatureForm.markAllAsTouched();
  }

  private convertTemperature(from: string, to: string): string {
    const fromTo: string = from + '-' + to;
    const degree: number = this.degree.value;
    let type: string = "";
    let calc: number = 0;

    switch(fromTo) {
      case "Celsius-Farenheit":
        calc = (degree * 9/5) + 32;
        type += ' ˚F';
        break;
      case "Celsius-Kelvin":
        calc += degree + 273.15;
        type += ' K';
        break;
      case "Farenheit-Celsius":
        calc = (degree - 32 ) * 5/9;
        type += ' ˚C';
        break;
      case "Farenheit-Kelvin":
        calc = (degree - 32 ) * 5/9 + 273.15;
        type += ' K';
        break;
      case "Kelvin-Celsius":
        calc = degree - 273.15;
        type += ' ˚C';
        break;
      case "Kelvin-Farenheit":
        calc = (degree - 273.15) * 9/5 + 32;
        type += ' ˚F';
        break;
      default:
        break;
    }
    return calc + type;
  }

}
