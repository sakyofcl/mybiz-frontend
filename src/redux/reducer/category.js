import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   dataFetched: false,
};

const category = (state = store, action) => {
   const { STORE_CATEGORY } = type;

   switch (action.type) {
      case STORE_CATEGORY:
         return ChangeState(state, {
            data: action.payload.data,
            dataFetched: true,
         });

      default:
         return state;
   }
};

export { category };
