import axios from '../lib/axios';
import { storeCategory } from '../redux/action/category';
import api from '../constant/api';
import { displayCommonError } from '../lib/displayCommonError';

function getCategoryGroup(dispatch, force = false) {
   if (!force) {
      axios.get(api.readCategoryGroup).then((res) => {
         if (res.data.status) {
            storeCategory(dispatch, {
               data: res.data.data,
            });
         }
         //Display common error when response as false
         displayCommonError(dispatch, res);
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

      //Display common error when response as false
      displayCommonError(dispatch, res);
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

      //Display common error when response as false
      displayCommonError(dispatch, res);
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

      //Display common error when response as false
      displayCommonError(dispatch, res);
   });
}
function updateCategory(dispatch, data = {}, response) {
   let intKey = ['cat_id'];
   let stringKey = ['name'];
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

   axios.post(api.updateCategory, finalData).then((res) => {
      response(res);

      //Display common error when response as false
      displayCommonError(dispatch, res);
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

      //Display common error when response as false
      displayCommonError(dispatch, res);
   });
}

function updateSubCategory(dispatch, data = {}, response) {
   let intKey = ['subcat_id'];
   let stringKey = ['name'];
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

   axios.post(api.updateSubCategory, finalData).then((res) => {
      response(res);

      //Display common error when response as false
      displayCommonError(dispatch, res);
   });
}

export { getCategoryGroup, categoryCreateApi, categorySubCreateApi, deleteCategory, deleteSubCategory, updateCategory, updateSubCategory };
