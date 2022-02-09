export class DateExtract {
   humanReadbleDate(timestamp, format = 'd-m-y', type = '-') {
      const dmy = /^d-m-y$/;
      const dMy = /^d-M-y$/;
      const dMytime = /^h:m$/;
      const ymd = /^y-m-d$/;
      const mdy = /^m-d-y$/;
      const dt = /^y-m-d h:m$/;

      const date = new Date(timestamp);

      const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const datevalues = {
         year: date.getFullYear(),
         month: date.getMonth(),
         day: date.getDate(),
         hour: date.getHours(),
         minit: date.getMinutes(),
      };

      //preset values
      const sm = date.toLocaleString('default', { month: 'short' });
      const lm = date.toLocaleString('default', { month: 'long' });
      const y = datevalues.year;
      const d = datevalues.day;
      const m = datevalues.month;
      const hm = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const minit = datevalues.minit;
      const h = datevalues.hour;

      if (dmy.test(format)) {
         if (type == '-') {
            return d + '-' + m + '-' + y;
         } else if (type == '/') {
            return d + '/' + m + '/' + y;
         }
      } else if (dMy.test(format)) {
         if (type == '-') {
            return d + '-' + sm + '-' + y;
         } else if (type == '/') {
            if (d < 10) {
               return '0' + d + '/' + sm + '/' + y;
            }
            return d + '/' + sm + '/' + y;
         }
      } else if (dMytime.test(format)) {
         return d + '-' + sm + '-' + y + ' ' + hm;
      } else if (ymd.test(format)) {
         return y + '-' + m + '-' + d;
      } else if (mdy.test(format)) {
         return m + '-' + d + '-' + y;
      } else if (dt.test(format)) {
         return y + '-' + m + '-' + d + 'T' + h + ':' + minit;
      }

      return datevalues;
   }

   static current(type = 'timestamp') {
      switch (type) {
         case 'timestamp':
            return new Date();
         case 'date':
            return new Date().toISOString().substring(0, 10);
         default:
            return new Date();
      }
   }
}
