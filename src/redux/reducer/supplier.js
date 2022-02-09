import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   supplierCode: [],
};

const supplier = (state = store, action) => {
   const { STORE_SUPPLIER_CODE } = type;

   switch (action.type) {
      case STORE_SUPPLIER_CODE: {
         const { code } = action.payload;
         return ChangeState(state, {
            supplierCode: code,
         });
      }

      default:
         return state;
   }
};

export { supplier };
