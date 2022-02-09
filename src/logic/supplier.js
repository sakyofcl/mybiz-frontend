import axios from 'axios';
import api from '../constant/api';
import { storeSupplierCode } from '../redux/action/supplier';

function fetchSupplierData(dispatch, ask = 'all') {
   switch (ask) {
      case 'code':
         axios.get(api.readSupplier + '?ask=code').then((res) => {
            if (res.data.status) {
               storeSupplierCode(dispatch, res.data.data);
            }
         });
         break;

      default:
         break;
   }
}

export { fetchSupplierData };
