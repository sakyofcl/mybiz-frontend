import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   fetchData: false,
};

const unit = (state = store, action) => {
   const { STORE_UNIT } = type;

   switch (action.type) {
      case STORE_UNIT:
         return ChangeState(state, {
            data: action.payload.data,
            fetchData: action.payload.fetchData,
         });

      default:
         return state;
   }
};

export { unit };
