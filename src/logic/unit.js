import axios from '../lib/axios';
import api from '../constant/api';
import type from '../constant/type';

function readUnit(dispatch, force = false) {
   if (!force) {
      axios.get(api.readUnit).then((res) => {
         if (res.data.status) {
            dispatch({
               type: type.STORE_UNIT,
               payload: {
                  data: res.data.data,
                  fetchData: true,
               },
            });
         }
      });
   }
}

export { readUnit };
