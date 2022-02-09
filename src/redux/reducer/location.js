import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   fetchData: false,
};

const location = (state = store, action) => {
   const { STORE_LOCATION } = type;

   switch (action.type) {
      case STORE_LOCATION:
         return ChangeState(state, {
            data: action.payload.data,
            fetchData: action.payload.fetchData,
         });

      default:
         return state;
   }
};

export { location };
