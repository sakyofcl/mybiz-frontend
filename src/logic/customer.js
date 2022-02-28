import axios from '../lib/axios';
import api from '../constant/api';
import type from '../constant/type';

function readCustomer(dispatch, force = false, page = 1, param = '') {
   if (!force) {
      axios.get(api.readCustomer + '?page=' + page + '&' + param).then((res) => {
         if (res.data.status) {
            const { data, total, to, per_page, current_page, last_page, data_summary } = res.data.data;
            dispatch({
               type: type.STORE_CUSTOMER,
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

function createCustomer(data = {}, response) {
   let stringKey = ['name', 'contact', 'email', 'reg_no', 'address', 'city'];
   let allData = data;
   let finalData = {};

   stringKey.map((v) => {
      if (allData[v]) {
         finalData[v] = allData[v];
      }
   });

   axios.post(api.createCustomer, finalData).then((res) => {
      response(res);
   });
}

function updateCustomer(dispatch, data = {}, response) {
   let intKey = ['customer_id', 'type_id'];
   let stringKey = ['name', 'contact', 'email', 'reg_no', 'address', 'city', 'status'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });
   stringKey.map((v) => {
      if (allData[v]) {
         finalData[v] = allData[v];
      }
   });

   axios.post(api.updateCustomer, finalData).then((res) => {
      response(res);
   });
}

function deleteCustomer(dispatch, data = {}, response) {
   let intKey = ['customer_id'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });

   axios.post(api.deleteCustomer, finalData).then((res) => {
      response(res);
   });
}

export { readCustomer, createCustomer, deleteCustomer, updateCustomer };
