import type from '../../constant/type';

const { LOG_IN, LOG_OUT } = type;

function storeLogin(dispatch, data) {
   dispatch({
      type: LOG_IN,
      payload: data,
   });
}
function storeLogout(dispatch) {
   dispatch({
      type: LOG_OUT,
   });
}

export { storeLogin, storeLogout };
