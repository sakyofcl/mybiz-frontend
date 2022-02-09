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
      total_product: 0,
      total_qty: 0,
      total_amount: 0,
   },
   out: {
      data: [],
      totData: 0,
      currentData: 0,
      perPage: 1,
      currentPage: 1,
      lastPage: 1,
      fetchData: false,
      dataSummary: {
         total_product: 0,
         total_qty: 0,
         total_amount: 0,
      },
   },
};

const stock = (state = store, action) => {
   const { STORE_STOCK_IN, STORE_STOCK_OUT } = type;

   switch (action.type) {
      case STORE_STOCK_IN:
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
      case STORE_STOCK_OUT:
         return ChangeState(state, {
            out: {
               data: action.payload.data,
               totData: action.payload.totData,
               currentData: action.payload.currentData,
               perPage: action.payload.perPage,
               currentPage: action.payload.currentPage,
               lastPage: action.payload.lastPage,
               fetchData: action.payload.fetchData,
               dataSummary: action.payload.dataSummary,
            },
         });

      default:
         return state;
   }
};

export { stock };
