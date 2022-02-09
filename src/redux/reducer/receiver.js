import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   receiverCode: [],
};

const receiver = (state = store, action) => {
   const { STORE_RECEIVER_CODE } = type;

   switch (action.type) {
      case STORE_RECEIVER_CODE: {
         const { code } = action.payload;
         return ChangeState(state, {
            receiverCode: code,
         });
      }

      default:
         return state;
   }
};

export { receiver };
