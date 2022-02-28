import axios from '../lib/axios';
import { storeModuleGroup } from '../redux/action/appmodule';
import api from '../constant/api';

function getModuleGroup(dispatch, force = false) {
   if (!force) {
      axios.get(api.readModuleGroup).then((res) => {
         if (res.data.status) {
            console.log(res.data.data);
            storeModuleGroup(dispatch, {
               data: res.data.data,
               dataFetched: true,
            });
         }
      });
   }
}

export { getModuleGroup };
