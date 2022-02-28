import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   dataFetched: false,
};

const role = (state = store, action) => {
   const { STORE_ROLE } = type;

   switch (action.type) {
      case STORE_ROLE:
         return ChangeState(state, {
            data: action.payload.data,
            dataFetched: true,
         });

      default:
         return state;
   }
};

export { role };
