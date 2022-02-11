import axios from 'axios';
import api from '../../../../constant/api';

import { storeSalesRef, storeFetchSalesRef } from '../../../../redux/action/invoice';
import { popupkey } from '../../../../constant/popupkey';
import { showPopup, hidePopup } from '../../../../redux/action/popup';

function fetchSalesRef(v, key, dispatch, response = (res) => {}) {
   let currentValue = v;
   let numberRegex = /^[0-9]+$/;

   if (currentValue) {
      if (numberRegex.test(currentValue)) {
         storeSalesRef(dispatch, { data: currentValue });
      }

      axios.get(api.readSalesRef + `?${key}=` + currentValue).then((res) => {
         if (res.data.status) {
            response(res);
         }
      });
   } else {
      storeSalesRef(dispatch, { data: '' });
      hidePopup(dispatch, popupkey.V_SALESREF_FILTER_DATA);
      storeFetchSalesRef(dispatch, { data: [] });
   }
}

export { fetchSalesRef };
