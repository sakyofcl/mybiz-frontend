import axios from 'axios';
import api from '../constant/api';

import { storePayment } from '../redux/action/payment';
function readPayments(dispatch, force = false, page = 1, param = '') {
   if (!force) {
      axios.get(api.readPayments + '?page=' + page + '&' + param).then((res) => {
         if (res.data.status) {
            const { data, total, to, per_page, current_page, last_page, data_summary } = res.data.data;
            storePayment(dispatch, {
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

export { readPayments };
