import axios from '../lib/axios';
import api from '../constant/api';
import type from '../constant/type';

import { storeUser } from '../redux/action/user';

function createUser(dispatch, data = {}, response) {
   let intKey = ['role_id'];
   let stringKey = ['email', 'name', 'password', 'contact'];
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

   axios.post(api.createUser, finalData).then((res) => {
      response(res);
   });
}

function updateUser(dispatch, data = {}, response) {
   let intKey = ['user_id', 'role_id'];
   let stringKey = ['email', 'name', 'password', 'contact', 'status'];
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

   axios.post(api.updateUser, finalData).then((res) => {
      response(res);
   });
}

function readUser(dispatch, force = false, page = 1, param = '') {
   if (!force) {
      axios.get(api.readUser + '?page=' + page + '&' + param).then((res) => {
         if (res.data.status) {
            const { data, total, to, per_page, current_page, last_page, data_summary } = res.data.data;
            storeUser(dispatch, {
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

function deleteUser(dispatch, data = {}, response) {
   let intKey = ['user_id'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });

   axios.post(api.deleteUser, finalData).then((res) => {
      response(res);
   });
}

export { updateUser, readUser, createUser, deleteUser };
