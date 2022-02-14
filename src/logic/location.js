import axios from 'axios';
import api from '../constant/api';
import type from '../constant/type';

function readLocation(dispatch, force = false) {
   if (!force) {
      axios.get(api.readLocation).then((res) => {
         if (res.data.status) {
            dispatch({
               type: type.STORE_LOCATION,
               payload: {
                  data: res.data.data,
                  fetchData: true,
               },
            });
         }
      });
   }
}

function deleteLocation(dispatch, data = {}, response) {
   let intKey = ['location_id'];
   let allData = data;
   let finalData = {};

   intKey.map((v) => {
      if (allData[v]) {
         finalData[v] = parseInt(allData[v]);
      }
   });

   axios.post(api.deleteLocation, finalData).then((res) => {
      response(res);
   });
}

export { readLocation, deleteLocation };
