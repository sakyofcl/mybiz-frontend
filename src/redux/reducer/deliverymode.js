import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   dataFetched: false,
};

const deliverymode = (state = store, action) => {
   const { STORE_DELIVERYMODE } = type;

   switch (action.type) {
      case STORE_DELIVERYMODE: {
         const { data } = action.payload;
         return ChangeState(state, {
            data: data,
            dataFetched: true,
         });
      }

      default:
         return state;
   }
};

export { deliverymode };
