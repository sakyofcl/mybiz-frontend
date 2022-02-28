import axios from '../lib/axios';
import api from '../constant/api';

import { storeInvoice, storeNextINvoiceNo } from '../redux/action/invoice';
function readInvoice(dispatch, force = false, page = 1, param = '') {
   if (!force) {
      axios.get(api.readInvoice + '?page=' + page + '&' + param).then((res) => {
         if (res.data.status) {
            const { data, total, to, per_page, current_page, last_page, data_summary } = res.data.data;
            storeInvoice(dispatch, {
               data: data,
               totData: total,
               currentData: to,
               perPage: per_page,
               currentPage: current_page,
               lastPage: last_page,
               fetchData: true,
               dataSummary: data_summary,
            });
         }
      });
   }
}

function calculateLineTotal(qty, unit, discount) {
   let q = parseInt(qty);
   let u = parseFloat(unit);
   let d = parseFloat(discount);

   return q * u - d;
}

function calculateInvoiceTotal(item) {
   let tot = 0;
   Object.keys(item).map((v, i) => {
      if (item[v].lineTotal !== '' || item[v].lineTotal > 0) {
         tot += item[v].lineTotal;
      }
   });

   return tot;
}

function calculateInvoiceDiscount(p, price) {
   let percentage = parseFloat(p);
   let priceAmount = parseFloat(price);

   return (percentage / 100) * priceAmount;
}

function calculateNetAmount(tot, dis) {
   let t = parseFloat(tot);
   let d = parseFloat(dis);
   return t - d;
}
function calculateTotalPaidAmount(item) {
   let tot = 0;
   item.map((v) => {
      tot += parseFloat(v.amount);
   });

   return tot;
}

function getNextInvoiceNumber(dispatch) {
   axios.get(api.readNextInvoiceNo).then((res) => {
      if (res.data.status) {
         const { next } = res.data.data;
         storeNextINvoiceNo(dispatch, { no: next });
      }
   });
}

export { readInvoice, calculateLineTotal, calculateInvoiceTotal, calculateInvoiceDiscount, calculateNetAmount, getNextInvoiceNumber, calculateTotalPaidAmount };
