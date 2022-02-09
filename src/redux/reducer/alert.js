import type from '../../constant/type';
import { alertkey } from '../../constant/alertkey';
import { ChangeState } from '../../lib/ChangeState';

let display = {};
Object.keys(alertkey).map((v) => (display[v] = { msg: '', status: '', show: false }));
let store = {
   display: display,
};

const alert = (state = store, action) => {
   const { SHOW_ALERT, HIDE_ALERT } = type;

   switch (action.type) {
      case SHOW_ALERT: {
         let payload = action.payload;
         return ChangeState(state, {
            display: {
               ...state.display,
               [payload.alertkey]: {
                  msg: 'msg' in payload ? payload.msg : state.display[payload.alertkey].msg,
                  status: 'status' in payload ? payload.status : state.display[payload.alertkey].status,
                  show: 'show' in payload ? payload.show : state.display[payload.alertkey].show,
               },
            },
         });
      }

      case HIDE_ALERT: {
         let payload = action.payload;
         return ChangeState(state, {
            display: {
               ...state.display,
               [payload.alertkey]: { msg: '', status: '', show: false },
            },
         });
      }

      default:
         return state;
   }
};

export { alert };
