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
      total_user: 0,
   },
};

const user = (state = store, action) => {
   const { STORE_USER } = type;

   switch (action.type) {
      case STORE_USER:
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

export { user };
