import axios from '../lib/axios';
import api from '../constant/api';
import type from '../constant/type';

function readStockIn(dispatch, force = false, page = 1, param = '') {
   if (!force) {
      axios.get(api.readStockIn + '?page=' + page + '&' + param).then((res) => {
         if (res.data.status) {
            const { data, total, to, per_page, current_page, last_page, data_summary } = res.data.data;
            dispatch({
               type: type.STORE_STOCK_IN,
               payload: {
                  data: data,
                  totData: total,
                  currentData: to,
                  perPage: per_page,
                  currentPage: current_page,
                  lastPage: last_page,
                  fetchData: true,
                  dataSummary: data_summary,
               },
            });
         }
      });
   }
}

function readStockOut(dispatch, force = false, page = 1, param = '') {
   if (!force) {
      axios.get(api.readStockOut + '?page=' + page + '&' + param).then((res) => {
         if (res.data.status) {
            const { data, total, to, per_page, current_page, last_page, data_summary } = res.data.data;
            dispatch({
               type: type.STORE_STOCK_OUT,
               payload: {
                  data: data,
                  totData: total,
                  currentData: to,
                  perPage: per_page,
                  currentPage: current_page,
                  lastPage: last_page,
                  fetchData: true,
                  dataSummary: data_summary,
               },
            });
         }
      });
   }
}

function saveStockIn(dispatch, data = {}, response = (res) => {}) {
   let intKey = ['barcode', 'delivery_mode_id', 'qty', 'supplier_id', 'receiver'];
   let floatKey = ['price'];
   let stringKey = ['name', 'received_date', 'remark'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });
   floatKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseFloat(allData[v]);
      }
   });
   stringKey.map((v) => {
      if (allData[v]) {
         finalData[v] = allData[v];
      }
   });

   axios.post(api.createStockIn, finalData).then((res) => {
      response(res);
   });
}
export { readStockIn, saveStockIn, readStockOut };
