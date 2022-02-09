import type from '../../constant/type';
import { popupkey } from '../../constant/popupkey';
import { ChangeState } from '../../lib/ChangeState';

let display = {};
Object.keys(popupkey).map((v) => (display[v] = false));
let store = {
   display: display,
};

const popup = (state = store, action) => {
   const { SHOW_POPUP, HIDE_POPUP } = type;

   switch (action.type) {
      case SHOW_POPUP:
         return ChangeState(state, {
            display: {
               ...state.display,
               [action.payload.popupKey]: true,
            },
         });
      case HIDE_POPUP:
         return ChangeState(state, {
            display: {
               ...state.display,
               [action.payload.popupKey]: false,
            },
         });
      default:
         return state;
   }
};

export { popup };
