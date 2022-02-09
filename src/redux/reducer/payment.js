import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   totData: 0,
   currentData: 0,
   perPage: 1,
   currentPage: 1,
   lastPage: 1,
   fetchData: false,
   dataSummary: {
      total_payment: 0,
      total_invoice: 0,
      total_amount: 0,
      total_customer: 0,
   },
};

const payment = (state = store, action) => {
   const { STORE_PAYMENT } = type;

   switch (action.type) {
      case STORE_PAYMENT:
         return ChangeState(state, {
            data: action.payload.data,
            totData: action.payload.totData,
            currentData: action.payload.currentData,
            perPage: action.payload.perPage,
            currentPage: action.payload.currentPage,
            lastPage: action.payload.lastPage,
            fetchData: action.payload.fetchData,
            dataSummary: action.payload.dataSummary,
         });

      default:
         return state;
   }
};

export { payment };
