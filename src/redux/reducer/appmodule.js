import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
let store = {
   data: [],
   dataFetched: false,
};

const appmodule = (state = store, action) => {
   const { STORE_MODULE_GROUP } = type;

   switch (action.type) {
      case STORE_MODULE_GROUP: {
         const { data, dataFetched } = action.payload;
         console.log(data, dataFetched);
         return ChangeState(state, {
            data: data,
            dataFetched: dataFetched,
         });
      }

      default:
         return state;
   }
};

export { appmodule };
