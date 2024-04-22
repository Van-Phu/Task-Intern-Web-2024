import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePickerColor'
})

export class CustomPipeDatePickedComponent implements PipeTransform {
  transform(value: any, dayNow: number, monthNow: number, yearNow: number, objectSelect: any) {
    if(value == dayNow) {
      return {background: '#F5F6F8'}
    }
    if(objectSelect.day == dayNow && objectSelect.month == monthNow && objectSelect.year == yearNow ) {
      return {background: '#F5F6F8', color: 'white'}
    }
    else {
      return {};
    }
  }
}
