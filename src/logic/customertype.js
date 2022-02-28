import axios from '../lib/axios';
import { storeCustomerType } from '../redux/action/customertype';
import api from '../constant/api';

function readCustomerType(dispatch, force = false) {
   if (!force) {
      axios.get(api.readCustomerType).then((res) => {
         if (res.data.status) {
            storeCustomerType(dispatch, {
               data: res.data.data,
               dataFetched: true,
            });
         }
      });
   }
}

export { readCustomerType };
