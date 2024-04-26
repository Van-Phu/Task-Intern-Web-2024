import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  forwardRef,
  DestroyRef,
  inject,
  ChangeDetectionStrategy,
  ViewChild
  
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthStrings } from '../data/monthStringData';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, noop, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  isVisibleDatePicker: boolean = true;
  listCurrentDays: any[] = [];
  listYear: any[] = [];

  dateNow: Date = new Date();

  date = this.dateNow.getDate();
  dayNow = this.dateNow.getDate();
  mothNow = this.dateNow.getUTCMonth() + 1;
  yearNow = this.dateNow.getUTCFullYear();

  dayCache = this.dayNow;
  monthCache = this.mothNow;
  yearCache = this.yearNow;

  rangeYearList = this.yearCache;

  yearSelectInList = -1;
  montSelectInList = -1;

  selectedDay: number = -1;
  selectedMonth: number = -1;
  selectedYear: number = -1;

  miliSecondInDay = 86400000;
  numberDay: number = -1;

  selectedDateShow: string = new Date().toLocaleDateString('en-CA');

  selectDate: any = {
    day: this.dateNow,
    month: this.mothNow,
    year: this.yearNow,
  };

  isItemActive: boolean = false;

  listMonth: { id: number; name: string }[] = [
    { id: 1, name: 'Tháng 1' },
    { id: 2, name: 'Tháng 2' },
    { id: 3, name: 'Tháng 3' },
    { id: 4, name: 'Tháng 4' },
    { id: 5, name: 'Tháng 5' },
    { id: 6, name: 'Tháng 6' },
    { id: 7, name: 'Tháng 7' },
    { id: 8, name: 'Tháng 8' },
    { id: 9, name: 'Tháng 9' },
    { id: 10, name: 'Tháng 10' },
    { id: 11, name: 'Tháng 11' },
    { id: 12, name: 'Tháng 12' },
  ];

  isShowTable: boolean = false;
  isShowListMonth: boolean = false;
  isShowListYear: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.getNumberDay(this.monthCache, this.yearCache);
    this.getListDay(this.numberDay);
    this.getSelectDate(this.dayNow, this.mothNow, this.yearNow);
    this.resetData();
    this.getListYear(this.yearNow,this.listYear);
    this.formControl.valueChanges
      .pipe(
        debounceTime(200),  
        tap(value => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
    
    // let newDate = new Date(
    //   this.yearCache,
    //   this.monthCache - 1,
    //   this.dayCache
    // );
    // this.selectedDateShow = newDate.toLocaleDateString('en-CA');
  }

  formControl: FormControl = new FormControl<string>('');

  destroyRef: DestroyRef = inject(DestroyRef);

  onChange: (value: string) => void = noop;
  onTouch: () => void = noop;

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(value: string): void {
    this.formControl.setValue(value, { emitEvent: false });
  }

  log():void{
    console.log(this.selectedDateShow);
  }

  change(): void {
    console.log(this.selectedDateShow);
  }

  @HostListener('click', ['$event'])
  focus(event: Event) {
    if (!this.isItemActive) {
      console.log('focus');
      this.isItemActive = true;
    }
  }

  @HostListener('document:click', ['$event'])
  blur(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isShowTable == true) {
        console.log('blur');
        this.close();
      }
    }
  }

  //reset varible
  resetData(): void {
    this.selectedDay = -1;
    this.selectedMonth = -1;
    this.selectedYear = -1;
  }

  //show or hide table Picker
  showTablePicker(): void {
    this.isShowTable = !this.isShowTable;
    if (this.isShowTable == false) {
      this.isShowListMonth = false;
      this.isShowListYear = false;
      this.close();
    } else if (this.isShowTable == true) {
      this.open();
      if (this.selectedDay != -1) {
        this.listCurrentDays = [];
        this.dayCache = this.selectedDay;
        this.monthCache = this.selectedMonth;
        this.yearCache = this.selectedYear;
        this.getNumberDay(this.selectedMonth, this.selectedYear);
        this.getListDay(this.numberDay);
      }
    }
  }

  open(): void {
    this.isShowTable = true;
    let dateSplit = this.selectedDateShow
    this.changeDataDate(dateSplit)
    console.log('open');
  }

  close(): void {
    this.isShowTable = false;
    console.log('close');
    this.isItemActive = false;
    this.isShowListMonth = false;
    this.isShowListYear = false;
  }

  //show list month
  showListMonth(year: number): void {
    this.isShowListMonth = true;
    this.yearSelectInList = year;
  }

  //get list year
  getListYear(rangeYear: number,lst: any): void {
    lst.push(rangeYear);
    let year = rangeYear; 
    for (let i = 0; i < 19; i++) {
      lst.push((year += 1));
    }
  }

  //show list year
  showListYear(): void {
    this.listYear = []
    this.getListYear(this.yearCache, this.listYear)
    this.isShowListYear = !this.isShowListYear;
    if (this.isShowListYear == false) {
      if (this.isShowListMonth == true) {
        this.isShowListMonth = false;
      }
    }
  }


  //handle get date

  //get Selected date
  getSelectDate(day: number, month: number, year: number): void {
    this.selectDate = {
      day: day,
      month: month,
      year: year,
    };
    this.selectedDay = this.selectDate.day;
    this.selectedMonth = this.selectDate.month;
    this.selectedYear = this.selectDate.year;

    this.listCurrentDays = [];
    this.dayCache = this.selectedDay;
    this.monthCache = this.selectedMonth;
    this.yearCache = this.selectedYear;
    this.getNumberDay(this.selectedMonth, this.selectedYear);
    this.getListDay(this.numberDay);
    this.change();
    this.getInputSelectedDate();
    this.isShowListMonth = false;
    this.isShowListYear = false;
  }

  //get number day of month
  getNumberDay(month: any, year: any): void {
    let numDays = new Date(year, month, 0).getDate();
    this.numberDay = numDays;
  }

  //get start date in month
  getDayOfWeek(year: any, month: any): number {
    var date = new Date(year, month - 1, 1);
    var dayOfWeek = date.getDay();
    return dayOfWeek;
  }

  //get month string
  getMonthString(month: number): string {
    return MonthStrings[month - 1];
  }

  //get list item in date to show in table
  getListDay(numberDays: number): void {
    this.listCurrentDays = []
    let numberDayAdd = this.getDayOfWeek(this.yearCache, this.monthCache);
    for (let i = 1; i <= numberDays; i++) {
      this.listCurrentDays.push(i);
    }
    for (let i = 1; i < numberDayAdd; i++) {
      this.listCurrentDays.unshift(-1);
    }
  }

  //get string selected date to show in input
  getInputSelectedDate(): void {
    let newDate = new Date(
      this.selectedYear,
      this.selectedMonth - 1,
      this.selectedDay
    );
    this.selectedDateShow = newDate.toLocaleDateString('en-CA');
  }

  //handle next
  next(): void {
    if (this.isShowListYear == true) {
      let year = this.listYear[this.listYear.length - 1];
      this.listYear = [];
      for (let i = 0; i < 20; i++) {
        this.listYear.push((year += 1));
      }
    } else {
      if (this.monthCache >= 12) {
        this.monthCache = 1;
        this.yearCache += 1;
        this.listCurrentDays = [];
        this.getNumberDay(this.monthCache, this.yearCache);
        this.getListDay(this.numberDay);
      } else {
        this.listCurrentDays = [];
        this.monthCache += 1;
        this.getNumberDay(this.monthCache, this.yearCache);
        this.getListDay(this.numberDay);
      }
    }
  }

  //handle pre month
  pre(): void {
    if (this.isShowListYear == true) {
      let year = this.listYear[0];
      this.listYear = [];
      for (let i = 0; i < 20; i++) {
        this.listYear.unshift((year -= 1));
      }
    } else {
      if (this.monthCache <= 1) {
        this.monthCache = 12;
        this.yearCache -= 1;
        this.listCurrentDays = [];
        this.getNumberDay(this.monthCache, this.yearCache);
        this.getListDay(this.numberDay);
      } else {
        this.listCurrentDays = [];
        this.monthCache -= 1;
        this.getNumberDay(this.monthCache, this.yearCache);
        this.getListDay(this.numberDay);
      }
    }
  }

  //handle get color of item day
  getColorDay(
    day: number,
    month: number,
    year: number,
    dayNow: number,
    monthNow: number,
    yearNow: number
  ): string {
    if (
      year > yearNow ||
      (year === yearNow && month > monthNow) ||
      (year === yearNow && month === monthNow && day >= dayNow)
    ) {
      if (
        day == this.selectedDay &&
        this.monthCache == this.selectedMonth &&
        this.yearCache == this.selectedYear
      ) {
        return 'white';
      } else {
        return 'black';
      }
    } else {
      return '#CCCCCC';
    }
  }

  handleSelectedDay(
    day: number,
    month: number,
    year: number,
    dayNow: number,
    monthNow: number,
    yearNow: number
  ): string {
    if (
      day != -1 &&
      (year > yearNow ||
        (year === yearNow && month > monthNow) ||
        (year === yearNow && month === monthNow && day >= dayNow))
    ) {
      return 'auto';
    } else {
      return 'none';
    }
  }

  handleMonth(
    month: number,
    year: number,
    monthNow: number,
    yearNow: number
  ): any {
    if (
      month != -1 &&
      (year > yearNow || (year === yearNow && month >= monthNow))
    ) {
      return { point: 'auto', color: '' };
    } else {
      return { point: 'none', color: '#CCCCCC' };
    }
  }

  //handle when change input date
  changeDataDate(data: string): void {
    let string = data.split('-');
    let dayInput = Number(string[2]);
    let monthInput = Number(string[1]);
    let yearInput = Number(string[0]);
    if (
      dayInput >= 1 &&
      dayInput <= 31 &&
      monthInput >= 1 &&
      monthInput <= 12 &&
      yearInput >= 1
    ) {
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
      } else {
        this.listCurrentDays = [];
        this.getSelectDate(dayInput, monthInput, yearInput);
        this.dayCache = dayInput;
        this.monthCache = monthInput;
        this.yearCache = yearInput;
        this.getNumberDay(this.selectedMonth, this.selectedYear);
        this.getListDay(this.numberDay);
      }
    }

    // if (string[0] == '') {
    //   console.log(1);
    //   this.listCurrentDays = [];
    //   this.getSelectDate(this.dayNow, this.mothNow, this.yearNow);
    //   this.dayCache = Number(this.dayNow);
    //   this.monthCache = Number(this.mothNow);
    //   this.yearCache = Number(this.yearNow);
    //   this.getNumberDay(this.selectedMonth, this.selectedYear);
    //   this.getListDay(this.numberDay);
    // }
  }
}
