import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';

//get data from local storage
let isOk = localStorage.getItem('auth') ? localStorage.getItem('auth') : false;
let token = isOk ? localStorage.getItem('token') : false;
let name = isOk ? localStorage.getItem('name') : false;

let store = {
   token: token,
   isOk: isOk,
   name: name,
   role: 'admin',
};

const auth = (state = store, action) => {
   const { LOG_IN, LOG_OUT } = type;

   switch (action.type) {
      case LOG_IN: {
         const { isOk, token, name } = action.payload;
         return ChangeState(state, {
            isOk: isOk,
            token: token,
            name: name,
         });
      }

      case LOG_OUT: {
         localStorage.clear();
         return ChangeState(state, {
            isOk: false,
            token: false,
            name: false,
         });
      }

      default:
         return state;
   }
};

export { auth };
