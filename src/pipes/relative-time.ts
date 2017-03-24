import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the RelativeTime pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'relativeTime'
})
@Injectable()
export class RelativeTime {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args) {
    if(!value) return 'NO_TIME';

    let milisecond = parseInt(value);
    return this.timeDifference(new Date(), new Date(milisecond));
    // return value.toLowerCase();
  }

  /**
   * 相对时间长度
   * @param  {date} current  当前时间
   * @param  {date} previous 历史时间
   * @return {string}        相对时间长度
   */
  timeDifference(current, previous):string {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      if(Math.round(elapsed/1000)<3) return 'just now';
      return Math.round(elapsed/1000) + 'seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + 'min ago';
    }

    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + 'h ago';
    }

    else if (elapsed < msPerMonth) {
      return 'about ' + Math.round(elapsed/msPerDay) + 'd ago';
    }

    else if (elapsed < msPerYear) {
      return 'about ' + Math.round(elapsed/msPerMonth) + 'month ago';
    }

    else {
      return 'about ' + Math.round(elapsed/msPerYear ) + 'years ago';
    }
  }
}
