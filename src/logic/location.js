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

export { readLocation };
