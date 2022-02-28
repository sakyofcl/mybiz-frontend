import axios from '../lib/axios';
import type from '../constant/type';
import api from '../constant/api';

function FetchPending(dispatch) {
   axios.get(api.getAds + '?status=pending').then((res) => {
      const { data, total, to, per_page, current_page, last_page } = res.data.data;
      dispatch({
         type: type.STORE_ADS,
         payload: {
            data: data,
            totData: total,
            currentData: to,
            perPage: per_page,
            currentPage: current_page,
            lastPage: last_page,
            fetchData: true,
         },
      });
   });
}

function FetchAll(dispatch) {
   axios.get(api.getAds).then((res) => {
      const { data, total, to, per_page, current_page, last_page } = res.data.data;
      dispatch({
         type: type.STORE_ADS,
         payload: {
            data: data,
            totData: total,
            currentData: to,
            perPage: per_page,
            currentPage: current_page,
            lastPage: last_page,
            fetchData: true,
         },
      });
   });
}

export { FetchPending, FetchAll };
