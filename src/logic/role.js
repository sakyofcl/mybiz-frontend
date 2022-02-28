import axios from '../lib/axios';
import api from '../constant/api';
import type from '../constant/type';

import { storeRole } from '../redux/action/role';

function readRole(dispatch, force = false) {
   if (!force) {
      axios.get(api.readRole).then((res) => {
         if (res.data.status) {
            storeRole(dispatch, {
               data: res.data.data,
               fetchData: true,
            });
         }
      });
   }
}

export { readRole };
