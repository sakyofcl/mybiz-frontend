import type from '../../constant/type';
import { ChangeState } from '../../../lib/ChangeState';

let store = {
   createProduct: {
      notify: {
         popupShow: false,
      },
   },
};

const auth = (state = store, action) => {
   const { OPEN_CLOSE_PRODUCT_POPUP } = type;

   switch (action.type) {
      case OPEN_CLOSE_PRODUCT_POPUP:
         return state;
      default:
         return state;
   }
};

export { auth };
