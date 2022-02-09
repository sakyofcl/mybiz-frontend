import type from '../../constant/type';

import { ChangeState } from '../../lib/ChangeState';

let store = {
   show: true,
};

const sidenav = (state = store, action) => {
   const { SHOW_SIDE_NAV, HIDE_SIDE_NAV, TOGGLE_SIDE_NAV } = type;

   switch (action.type) {
      case SHOW_SIDE_NAV:
         return ChangeState(state, {
            show: true,
         });
      case HIDE_SIDE_NAV:
         return ChangeState(state, {
            show: false,
         });
      case TOGGLE_SIDE_NAV:
         return ChangeState(state, {
            show: state.show ? false : true,
         });
      default:
         return state;
   }
};

export { sidenav };
