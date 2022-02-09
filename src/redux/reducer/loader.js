import type from '../../constant/type';
import { loaderkey } from '../../constant/loaderkey';
import { ChangeState } from '../../lib/ChangeState';

let display = {};
Object.keys(loaderkey).map((v) => (display[v] = { active: false }));
let store = {
   display: display,
};

const loader = (state = store, action) => {
   const { SHOW_LOADER, HIDE_LOADER } = type;

   switch (action.type) {
      case SHOW_LOADER: {
         let payload = action.payload;
         return ChangeState(state, {
            display: {
               ...state.display,
               [payload.loaderkey]: {
                  ...state.display[payload.loaderkey],
                  active: true,
               },
            },
         });
      }
      case HIDE_LOADER: {
         let payload = action.payload;
         return ChangeState(state, {
            display: {
               ...state.display,
               [payload.loaderkey]: {
                  ...state.display[payload.loaderkey],
                  active: false,
               },
            },
         });
      }
      default:
         return state;
   }
};

export { loader };
