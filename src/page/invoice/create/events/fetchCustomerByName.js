import axios from 'axios';
import api from '../../../../constant/api';

import { storeInvoiceCustomerInfo, storeInvoiceCustomers } from '../../../../redux/action/invoice';
import { popupkey } from '../../../../constant/popupkey';
import { showPopup, hidePopup } from '../../../../redux/action/popup';
function fetchCustomerByName(v, dispatch, response = (res) => {}) {
   let currentValue = v;

   storeInvoiceCustomerInfo(dispatch, { name: currentValue });

   if (currentValue) {
      axios.get(api.searchCustomers + '?name=' + currentValue).then((res) => {
         if (res.data.status) {
            response(res);
         }
      });
   } else {
      hidePopup(dispatch, popupkey.V_CUSTOMER_FILTER_DATA);
      storeInvoiceCustomers(dispatch, []);
   }
}

export { fetchCustomerByName };
