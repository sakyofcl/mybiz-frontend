import axios from '../lib/axios';
import api from '../constant/api';
import { storeDeliveryMode } from '../redux/action/deliverymode';

function fetchDeliveryMode(dispatch, force = false, page = 1) {
   if (!force) {
      axios.get(api.readDeliveryMode).then((res) => {
         if (res.data.status) {
            storeDeliveryMode(dispatch, { data: res.data.data });
         }
      });
   }
}

export { fetchDeliveryMode };
