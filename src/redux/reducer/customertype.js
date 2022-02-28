import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   fetchData: false,
};

const customertype = (state = store, action) => {
   const { STORE_CUSTOMERTYPE } = type;

   switch (action.type) {
      case STORE_CUSTOMERTYPE:
         return ChangeState(state, {
            data: action.payload.data,
            fetchData: action.payload.fetchData,
         });

      default:
         return state;
   }
};

export { customertype };
