import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyDateService {
  constructor() { 

  }

  myDate(_dateValue?: string | Date | undefined): myDateClass {
    return new myDateClass(_dateValue);
  }
}


class myDateClass {
  _dateValue!: string | Date | undefined;

  constructor(_dateValue?: string | Date | undefined) {
    const t = this;
    t._dateValue = _dateValue;
    if (_dateValue === undefined) {
      t._dateValue = new Date();
    } else if (typeof t._dateValue !== 'string' && !(t._dateValue instanceof Date)) {
      throw new Error('myDate의 _dateValue 인자는 날짜관련 값이어야 합니다.');
    }

    return t;
  }

  isValid(): boolean {
    const t = this;

    if (typeof t._dateValue === 'string') {
      // _dateValue 값이 문자열인 경우
      const date_space_split = t._dateValue.split(' ');
      if (date_space_split.length !== 2) {
        return false;
      }

      // date 부분 체크
      const only_date = date_space_split[0];
      const only_date_stroke_split = only_date.split('-');
      if (only_date_stroke_split.length !== 3) {
        return false;
      }
      const year = Number(only_date_stroke_split[0]); // ex) 2020
      const month = Number(only_date_stroke_split[1]); // ex) 5 (인덱스 5가 아닌 순수 5월)
      const date = Number(only_date_stroke_split[2]); // ex) 11
      if (isNaN(year) || year <= 1800) {
        return false;
      }
      if (isNaN(month) || (month < 1 || month > 12)) {
        return false;
      }
      if (isNaN(date) || (date < 1 || date > 31)) {
        return false;
      }

      const dateObject = new Date();
      dateObject.setFullYear(year);
      const setYearAfterYear = dateObject.getFullYear();

      dateObject.setMonth(month - 1);
      const setMonthAfterYear = dateObject.getFullYear();
      const setMonthAfterMonth = dateObject.getMonth() + 1;

      if (setYearAfterYear !== setMonthAfterYear) {
        return false;
      }

      dateObject.setDate(date);
      const setDateAfterYear = dateObject.getFullYear();
      const setDateAfterMonth = dateObject.getMonth() + 1;
      const setDateAfterDate = dateObject.getDate();

      if (setYearAfterYear !== setDateAfterYear) {
        return false;
      }

      if (setMonthAfterMonth !== setDateAfterMonth) {
        return false;
      }


      // time 부분 체크
      const only_time = date_space_split[1];
      const only_time_colon_split = only_time.split(':');
      if (only_time_colon_split.length !== 3) {
        return false;
      }
      const hour = Number(only_time_colon_split[0]);
      const minute = Number(only_time_colon_split[1]);
      const second = Number(only_time_colon_split[2]);
      if (isNaN(hour) || (hour < 0 || hour > 23)) {
        return false;
      }
      if (isNaN(minute) || (minute < 0 || minute > 59)) {
        return false;
      }
      if (isNaN(second) || (second < 0 || second > 59)) {
        return false;
      }

      return true;
    }




    if (typeof t._dateValue === 'object') {
      // _dateValue 값이 오브젝트인 경우
      if (typeof t._dateValue.getFullYear !== 'function') {
        return false;
      }
      if (typeof t._dateValue.getMonth !== 'function') {
        return false;
      }
      if (typeof t._dateValue.getDate !== 'function') {
        return false;
      }
      if (typeof t._dateValue.getHours !== 'function') {
        return false;
      }
      if (typeof t._dateValue.getMinutes !== 'function') {
        return false;
      }
      if (typeof t._dateValue.getSeconds !== 'function') {
        return false;
      }

      return true;
    }




    return false;
  }


  add(value: number, unit: string): myDateClass {
    const t = this;

    if (value === undefined) {
      throw new Error('myDate의 add함수는 value인자가 필요합니다.');
    }

    if (typeof value !== 'number') {
      throw new Error('myDate의 add함수의 value인자는 숫자이어야 합니다.');
    }

    const allow_unit = [
      'year', 'years',
      'month', 'months',
      'date', 'dates',
      'hour', 'hours',
      'minute', 'minutes',
      'second', 'seconds'
    ];

    if (unit === undefined) {
      throw new Error('myDate의 add함수는 unit인자가 필요합니다.');
    }

    if (typeof unit !== 'string') {
      throw new Error('myDate의 add함수의 unit인자는 문자이어야 합니다.');
    }

    if (!allow_unit.includes(unit)) {
      throw new Error('myDate의 add함수의 unit인자는 ' + allow_unit.join(',') + '중에 하나이어야 합니다.');
    }

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : C');
    }


    const current_dateObject = t.getDateInfo().dateObject;

    switch (unit) {
      case 'year':
      case 'years':
        // 년도 증감
        const current_year = current_dateObject.getFullYear();
        const after_year = current_year + value;
        current_dateObject.setFullYear(after_year);
        break;

      case 'month':
      case 'months':
        // 월 증감
        const current_month_index = current_dateObject.getMonth();
        const after_month_index = current_month_index + value;
        current_dateObject.setMonth(after_month_index);
        break;

      case 'date':
      case 'dates':
        // 일 증감
        const current_date = current_dateObject.getDate();
        const after_date = current_date + value;
        current_dateObject.setDate(after_date);
        break;

      case 'hour':
      case 'hours':
        // 시 증감
        const current_hour = current_dateObject.getHours();
        const after_hour = current_hour + value;
        current_dateObject.setHours(after_hour);
        break;

      case 'minute':
      case 'minutes':
        // 분 증감
        const current_minute = current_dateObject.getMinutes();
        const after_minute = current_minute + value;
        current_dateObject.setMinutes(after_minute);
        break;

      case 'second':
      case 'seconds':
        // 초 증감
        const currentSecond = current_dateObject.getSeconds();
        const afterSecond = currentSecond + value;
        current_dateObject.setSeconds(afterSecond);
        break;
    }

    t._dateValue = current_dateObject;

    return t;
  }


  getDateInfo() {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : A');
    }

    if (typeof t._dateValue === 'string') {
      const date_space_split = t._dateValue.split(' ');

      const only_date = date_space_split[0];
      const only_date_stroke_split = only_date.split('-');
      const year = Number(only_date_stroke_split[0]); // ex) 2020
      const month = Number(only_date_stroke_split[1]); // ex) 5 (인덱스 5가 아닌 순수 5월)
      const date = Number(only_date_stroke_split[2]); // ex) 11

      const only_time = date_space_split[1];
      const only_time_colon_split = only_time.split(':');
      const hour = Number(only_time_colon_split[0]);
      const minute = Number(only_time_colon_split[1]);
      const second = Number(only_time_colon_split[2]);

      const dateObject = new Date();
      dateObject.setFullYear(year);
      dateObject.setMonth(month - 1);
      dateObject.setDate(date);
      dateObject.setHours(hour);
      dateObject.setMinutes(minute);
      dateObject.setSeconds(second);

      const day = dateObject.getDay();

      return {
        year: year,
        month: month,
        date: date,
        hour: hour,
        minute: minute,
        second: second,
        day: day,
        dateObject: dateObject
      };
    }

    if (typeof t._dateValue === 'object') {
      return {
        year: t._dateValue.getFullYear(),
        month: (t._dateValue.getMonth() + 1),
        date: t._dateValue.getDate(),
        hour: t._dateValue.getHours(),
        minute: t._dateValue.getMinutes(),
        second: t._dateValue.getSeconds(),
        day: t._dateValue.getDay(),
        dateObject: t._dateValue
      };
    }

    throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : B');
  }


  getTime() {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : F');
    }

    const dateInfo = t.getDateInfo();
    return dateInfo.dateObject.getTime();
  }


  getDay(type?: string): number | string {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : G');
    }

    const day_ko = ['일', '월', '화', '수', '목', '금', '토'];
    const day_korean = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const day_en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day_english = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let return_day: any = t.getDateInfo().dateObject.getDay();

    if (type === 'ko') {
      return_day = day_ko[return_day];
    }

    if (type === 'korean') {
      return_day = day_korean[return_day];
    }

    if (type === 'en') {
      return_day = day_en[return_day];
    }

    if (type === 'english') {
      return_day = day_english[return_day];
    }

    return return_day;
  }


  getYear(type: string) {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : K');
    }

    const dateInfo = t.getDateInfo();
    let return_year: any = dateInfo.year;

    if (type === 'YY') {
      return_year = (return_year + '').substr(2, 2);
    }

    return return_year;
  }


  getMonth(type: string) {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : L');
    }

    const dateInfo = t.getDateInfo();
    let return_month: any = dateInfo.month;

    if (type === 'MM') {
      return_month = t.zeroFill(return_month);
    }

    return return_month;
  }


  getDate(type: string) {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : M');
    }

    const dateInfo = t.getDateInfo();
    let return_date: any = dateInfo.date;

    if (type === 'DD' || type === 'dd') {
      return_date = t.zeroFill(return_date);
    }

    return return_date;
  }


  getHour(type: string) {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : H');
    }

    const dateInfo = t.getDateInfo();
    let return_hour: any = dateInfo.hour;

    if (type === 'HH' || type === 'hh') {
      return_hour = t.zeroFill(return_hour);
    }

    return return_hour;
  }


  getMinute(type: string) {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : I');
    }

    const dateInfo = t.getDateInfo();
    let return_minute: any = dateInfo.minute;

    if (type === 'mm' || type === 'ii') {
      return_minute = t.zeroFill(return_minute);
    }

    return return_minute;
  }


  getSecond(type: string) {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : J');
    }

    const dateInfo = t.getDateInfo();
    let return_second: any = dateInfo.second;

    if (type === 'ss') {
      return_second = t.zeroFill(return_second);
    }

    return return_second;
  }


  format(format_string: string) {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : D');
    }

    if (format_string === undefined) {
      throw new Error('myDate함수는 format_string인자가 필요합니다.');
    }

    if (typeof format_string !== 'string') {
      throw new Error('myDate함수의 format_string인자는 문자열이어야 합니다.');
    }

    const allow_format_unit = [
      'yy', 'YY', 'yyyy', 'YYYY', // 년도
      'M', 'MM', // 월
      'd', 'dd', 'D', 'DD', // 일
      'h', 'hh', 'H', 'HH', // 시
      'm', 'mm', 'i', 'ii', // 분
      's', 'ss', // 초
      '${LD}', // 현재 월의 마지막일
    ];

    let return_format = format_string;
    const dateInfo = t.getDateInfo();

    // 현재 월의 마지막 일 치환
    return_format = return_format.replace(/\$\{LD\}/g, t.getLastDate().toString());

    // 년도 치환
    return_format = return_format.replace(/YYYY/g, (dateInfo.year + ''));
    return_format = return_format.replace(/yyyy/g, (dateInfo.year + ''));
    return_format = return_format.replace(/YY/g, (dateInfo.year + '').substr(2, 2));
    return_format = return_format.replace(/yy/g, (dateInfo.year + '').substr(2, 2));

    // 월 치환
    return_format = return_format.replace(/MM/g, t.zeroFill(dateInfo.month));
    return_format = return_format.replace(/M/g, dateInfo.month + '');

    // 일 치환
    return_format = return_format.replace(/DD/g, t.zeroFill(dateInfo.date));
    return_format = return_format.replace(/dd/g, t.zeroFill(dateInfo.date));
    return_format = return_format.replace(/D/g, dateInfo.date + '');
    return_format = return_format.replace(/d/g, dateInfo.date + '');

    // 시 치환
    return_format = return_format.replace(/HH/g, t.zeroFill(dateInfo.hour));
    return_format = return_format.replace(/hh/g, t.zeroFill(dateInfo.hour));
    return_format = return_format.replace(/H/g, dateInfo.hour + '');
    return_format = return_format.replace(/h/g, dateInfo.hour + '');

    // 분 치환
    return_format = return_format.replace(/mm/g, t.zeroFill(dateInfo.minute));
    return_format = return_format.replace(/ii/g, t.zeroFill(dateInfo.minute));
    return_format = return_format.replace(/m/g, dateInfo.minute + '');
    return_format = return_format.replace(/i/g, dateInfo.minute + '');

    // 초 치환
    return_format = return_format.replace(/ss/g, t.zeroFill(dateInfo.second));
    return_format = return_format.replace(/s/g, dateInfo.second + '');


    return return_format;
  }

  getLastDate() {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate의 날짜 값이 유효한 날짜가 아닙니다. Error-Type : Q');
    }

    const dateInfo = t.getDateInfo();
    const currentYear = Number(dateInfo.year);
    let targetYear = Number(currentYear);

    const currentMonth = Number(dateInfo.month); // 인덱스 아님.. 즉 5이면 5월이고 인덱스로 따지면 4
    let targetNextMonth = currentMonth + 1;
    if (targetNextMonth > 12) {
      targetNextMonth = 1;
      targetYear += 1;
    }

    const zeroDateObject = new Date(dateInfo.dateObject);

    (zeroDateObject as any).setYear(targetYear);
    zeroDateObject.setMonth(targetNextMonth - 1);
    zeroDateObject.setDate(0);

    const lastDate = zeroDateObject.getDate();
    return Number(lastDate);
  }

  getDatePeriodMonthList(start_datetime: string, end_datetime: string) {
    if (!new myDateClass(start_datetime).isValid()) {
      return [this.format('YYYYMM')];
    }

    if (!new myDateClass(end_datetime).isValid()) {
      return [this.format('YYYYMM')];
    }

    // console.log('유효!');
    const targetYYYYMM = [];
    let currentDatetime = start_datetime;
    for (let i = 0; i < 1000; i++) {
      // console.log('i', i);
      // console.log('currentDatetime', currentDatetime);
      // console.log('targetEndDatetime', targetEndDatetime);
      if (new myDateClass(currentDatetime).getTime() > new myDateClass(end_datetime).getTime()) {
        break;
      }
      const YYYYMM = new myDateClass(currentDatetime).format('YYYYMM');
      targetYYYYMM.push(YYYYMM);
      currentDatetime = new myDateClass(currentDatetime).add(1, 'month').format('YYYY-MM-DD 00:00:00');
    }
    return targetYYYYMM;
  }

  getThisWeekLastDateObject(): myDateClass {
    let currentTime = this.getTime();
    for (let i = 1; i <= 7; i++) {
      const dateObject = new myDateClass(new Date(currentTime));

      const day = dateObject.getDay();
      if (day === 0) {
        return new myDateClass(new Date(currentTime));
      }

      currentTime += (1000 * 60 * 60 * 24);
    }

    return this;
  }

  zeroFill(number_value: number) {
    const t = this;

    if (number_value === undefined) {
      throw new Error('myDate함수의 zeroFill함수는 number_value인자가 필요합니다.');
    }

    if (typeof number_value !== 'number') {
      throw new Error('myDate함수의 zeroFill함수의 number_value인자는 숫자이어야 합니다.');
    }

    let return_number_string = number_value + '';

    if (number_value < 10) {
      return '0' + return_number_string;
    }

    return return_number_string;
  }
}

