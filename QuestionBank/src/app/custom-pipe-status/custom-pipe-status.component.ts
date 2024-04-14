import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})

export class CustomPipeStatusComponent implements PipeTransform{
  transform(value: any) {
    switch(value){
      case 0:
        return 'black'
      case 1:
        return  '#31ADFF'
      case 2:
        return '#008000'
      case 3:
        return '#FB311C'
      case 4: 
        return '#B7B92F'
      default:
        return 'black'
    }
    
  }
}
