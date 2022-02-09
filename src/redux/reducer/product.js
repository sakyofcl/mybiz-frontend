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
      total_sell_price: 0,
      total_cost_price: 0,
   },
   nextBarcode: 0,
};

const product = (state = store, action) => {
   const { STORE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, STORE_NEXT_BARCODE } = type;

   switch (action.type) {
      case STORE_PRODUCT:
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

      case UPDATE_PRODUCT:
         return state;
      case DELETE_PRODUCT:
         return state;
      case STORE_NEXT_BARCODE: {
         const { barcode } = action.payload;
         return ChangeState(state, {
            nextBarcode: barcode,
         });
      }
      default:
         return state;
   }
};

export { product };
