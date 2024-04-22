import { Component, OnInit, HostListener, ElementRef, forwardRef } from '@angular/core';
import { MonthStrings } from '../data/monthStringData';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {

  constructor(private elementRef: ElementRef) {}
  isVisibleDatePicker: boolean = true
  listCurrentDays: any[] = []
  dateNow:Date = new Date()
  date = this.dateNow.getDate();
  dayNow = this.dateNow.getDate();
  mothNow = this.dateNow.getUTCMonth() + 1;
  yearNow = this.dateNow.getUTCFullYear();

  dayCache = this.dayNow
  monthCache = this.mothNow
  yearCache = this.yearNow

  selectedDay:number = -1
  selectedMonth: number = -1
  selectedYear: number = -1

  isShowTable: boolean = false

  miliSecondInDay = 86400000;
  numberDay:number = -1
  todayTimestamp =
  Date.now() -
  (Date.now() % this.miliSecondInDay) +
  new Date().getTimezoneOffset() * 1000 * 60;
  selectedDateShow:string = new Date().toLocaleDateString('en-CA')

  selectDate:any = {day: this.dateNow, month: this.mothNow, year: this.yearNow}

  isItemActive: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedDateShow = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.getNumberDay(this.monthCache, this.yearCache)
    this.getListDay(this.numberDay)
    this.getSelectDate(this.dayNow, this.mothNow, this.yearNow);
    this.resetData()
  }

  change(): void {
    console.log(this.selectedDateShow);
  }

  @HostListener('click', ['$event'])
  focus(event: Event) {
    if (!this.isItemActive) {
      console.log("focus");
      this.isItemActive = true
    }
  } 

  @HostListener('document:click', ['$event'])
  blur(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
  
      if (this.isShowTable) {
        console.log('blur');
        this.close();
      }
    }
  }  

  //reset varible
  resetData():void{
    this.selectedDay = -1
    this.selectedMonth = -1
    this.selectedYear = -1
  }

  //show or hide table Picker
  showTablePicker():void{
    this.isShowTable = !this.isShowTable
    if(this.isShowTable == false){
      this.close()
    }
    else if(this.isShowTable == true){

      this.open()
      if(this.selectedDay != -1){
        this.listCurrentDays = []
        this.dayCache = this.selectedDay;
        this.monthCache = this.selectedMonth;
        this.yearCache = this.selectedYear;
        this.getNumberDay(this.selectedMonth, this.selectedYear);
        this.getListDay(this.numberDay);
      }

    }
  }

  // focus():void{
  //   if()
  // }

  open():void{
    this.isShowTable = true
    console.log("open");

  }

  close():void{

    this.isShowTable = false
    console.log("close");
    this.isItemActive = false
  }

  //get Selected date
  getSelectDate(day: number, month: number, year: number):void{
    this.selectDate = {
      day: day,
      month: month, 
      year: year
    }
    this.selectedDay = this.selectDate.day
    this.selectedMonth = this.selectDate.month
    this.selectedYear = this.selectDate.year
    this.change()
    this.getInputSelectedDate();
  }

  //get number day of month
  getNumberDay(month: any, year:any):void{
    let numDays = new Date(year, month, 0).getDate()
    this.numberDay = numDays
  }

  //get start date in month
  getDayOfWeek(year:any, month:any):number {
    var date = new Date(year, month - 1, 1);
    var dayOfWeek = date.getDay();
    return dayOfWeek;
  }

  //get month string
  getMonthString(month:number):string{
    return(MonthStrings[month - 1])  
  }


  //get list item in date to show in table
  getListDay(numberDays:number):void{
    let numberDayAdd = this.getDayOfWeek(this.yearCache, this.monthCache)
    console.log(numberDayAdd);
    for(let i = 1; i <= numberDays; i++){
      this.listCurrentDays.push(i)
    }
    for(let i = 1; i < numberDayAdd; i++){
      this.listCurrentDays.unshift(-1)
    }
  }

  //get string selected date to show in input
  getInputSelectedDate():void{
    let newDate = new Date( this.selectedYear, this.selectedMonth - 1,  this.selectedDay)
    this.selectedDateShow = newDate.toLocaleDateString('en-CA');
  }

  //handle next month
  nextMonth():void{
    if(this.monthCache >= 12 ){
      this.monthCache = 1
      this.yearCache += 1
      this.listCurrentDays = []
      this.getNumberDay(this.monthCache, this.yearCache)
      this.getListDay(this.numberDay)
    }else{
      this.listCurrentDays = []
      this.monthCache += 1
      this.getNumberDay(this.monthCache, this.yearCache)
      this.getListDay(this.numberDay)
    }

  }

  //handle pre month
  preMonth():void{
    if(this.monthCache <= 1 ){
      this.monthCache = 12
      this.yearCache -= 1
      this.listCurrentDays = []
      this.getNumberDay(this.monthCache, this.yearCache)
      this.getListDay(this.numberDay)
    }else{
      this.listCurrentDays = []
      this.monthCache -= 1
      this.getNumberDay(this.monthCache, this.yearCache)
      this.getListDay(this.numberDay)
    }
  }

  //handle get color of item day
  getColorDay(day: number, month: number, year: number, dayNow: number, monthNow: number, yearNow: number): string {
    if (year > yearNow ||
        (year === yearNow && month > monthNow) ||
        (year === yearNow && month === monthNow && day >= dayNow)) {
          if(day == this.selectedDay && this.monthCache == this.selectedMonth && this.yearCache == this.selectedYear){
            return 'white'
          }else{
            return 'black';
          }

    } else {
        return '#CCCCCC';
    }
  }

  handleSectDay(day: number, month: number, year: number, dayNow: number, monthNow: number, yearNow: number):string{
    if ((day != -1) && (year > yearNow ||
      (year === yearNow && month > monthNow) ||
      (year === yearNow && month === monthNow && day >= dayNow))) {
      return 'auto';
    } else {
        return 'none';
    }

  }

  //handle when change input date
  changeDataDate(data: string): void {
    let string = data.split('-');
    let dayInput = Number(string[2]);
    let monthInput = Number(string[1]);
    let yearInput = Number(string[0]);

    if ((dayInput >= 1 && dayInput <= 31) && (monthInput >= 1 && monthInput <= 12) && (yearInput >= 1)) {
        let currentDate = new Date();
        let inputDate = new Date(yearInput, monthInput - 1, dayInput);
        if (inputDate < currentDate) {
          this.listCurrentDays = [];
          this.dayCache = this.dayNow;
          this.monthCache = this.mothNow;
          this.yearCache = this.yearNow;
          this.getSelectDate(this.dayCache, this.monthCache, this.yearCache);
          this.getNumberDay(this.selectedMonth, this.selectedYear);
          this.getListDay(this.numberDay);
        }
        else{
          this.listCurrentDays = [];
          this.getSelectDate(dayInput, monthInput, yearInput);
          this.dayCache = dayInput;
          this.monthCache = monthInput;
          this.yearCache = yearInput;
          this.getNumberDay(this.selectedMonth, this.selectedYear);
          this.getListDay(this.numberDay);
        }
    }

    if (string[0] == '') {
        this.listCurrentDays = [];
        this.getSelectDate(this.dayNow, this.mothNow, this.yearNow);
        this.dayCache = Number(this.dayNow);
        this.monthCache = Number(this.mothNow);
        this.yearCache = Number(this.yearNow);
        this.getNumberDay(this.selectedMonth, this.selectedYear);
        this.getListDay(this.numberDay);
    }

}

}

