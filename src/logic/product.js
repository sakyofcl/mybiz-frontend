import axios from 'axios';
import api from '../constant/api';
import { storeProduct, storeNextBarcode } from '../redux/action/product';

function createProduct(dispatch, data = {}, response) {
   let intKey = ['barcode', 'cat_id', 'subcat_id', 'location_id', 're_order_level', 'qty'];
   let floatKey = ['cash_price', 'cost_price', 'max_price', 'sell_price', 'discount', 'vat'];
   let stringKey = ['name1', 'name2', 'unit'];
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

   axios.post(api.createProduct, finalData).then((res) => {
      response(res);
   });
}

function fetchProduct(dispatch, force = false, page = 1, param = '') {
   if (!force) {
      axios.get(api.readProduct + '?page=' + page + '&' + param).then((res) => {
         if (res.data.status) {
            const { data, total, to, per_page, current_page, last_page, data_summary } = res.data.data;
            storeProduct(dispatch, {
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

function deleteProduct(dispatch, data = {}, response) {
   let intKey = ['pid'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });

   axios.post(api.deleteProduct, finalData).then((res) => {
      response(res);
   });
}

function fetchProductInfo(keyType, key, ask, ok = (data) => {}) {
   axios.get(`${api.readProductInfo}?${keyType}=${key}&ask=${ask}`).then((res) => {
      if (res.data.status) {
         ok(res.data.data);
      }
   });
}
function getNextBarcode(dispatch) {
   axios.get(`${api.readProductBarcode}?ask=next`).then((res) => {
      if (res.data.status) {
         storeNextBarcode(dispatch, {
            barcode: res.data.data.next,
         });
      }
   });
}

function checkBarcode(value, ok = (data) => {}) {
   axios.get(`${api.readProductBarcode}?ask=check&value=${value}`).then((res) => {
      if (res.data.status) {
         ok(res.data.data);
      }
   });
}

function fetchSpecificProduct() {}
export { createProduct, fetchProduct, fetchProductInfo, getNextBarcode, checkBarcode, deleteProduct };
