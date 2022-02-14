import axios from 'axios';
import { storeCategory } from '../redux/action/category';
import api from '../constant/api';

function getCategoryGroup(dispatch, force = false) {
   if (!force) {
      axios.get(api.readCategoryGroup).then((res) => {
         if (res.data.status) {
            storeCategory(dispatch, {
               data: res.data.data,
            });
         }
      });
   }
}

function categoryCreateApi(name, dispatch, message = (msg, status) => {}) {
   axios.post(api.createCategory, { name: name }).then((res) => {
      if (res.data.status) {
         getCategoryGroup(dispatch);
         message(res.data.message, '1');
      } else {
         message(res.data.message, '0');
      }
   });
}

function categorySubCreateApi(name, id, dispatch, message = (msg, status) => {}) {
   axios.post(api.createSubCategory, { name: name, cat_id: id }).then((res) => {
      if (res.data.status) {
         getCategoryGroup(dispatch);
         message(res.data.message, '1');
      } else {
         message(res.data.message, '0');
      }
   });
}

function deleteCategory(dispatch, data = {}, response) {
   let intKey = ['cat_id'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });

   axios.post(api.deleteCategory, finalData).then((res) => {
      response(res);
   });
}

function deleteSubCategory(dispatch, data = {}, response) {
   let intKey = ['subcat_id'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });

   axios.post(api.deleteSubCategory, finalData).then((res) => {
      response(res);
   });
}

export { getCategoryGroup, categoryCreateApi, categorySubCreateApi, deleteCategory, deleteSubCategory };
