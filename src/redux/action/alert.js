import type from '../../constant/type';

const { SHOW_ALERT, HIDE_ALERT } = type;
function showAlert(dispatch, alertkey, data = {}) {
   dispatch({
      type: SHOW_ALERT,
      payload: {
         alertkey: alertkey,
         show: true,
         ...data,
      },
   });
}

function hideAlert(dispatch, alertkey) {
   dispatch({
      type: HIDE_ALERT,
      payload: {
         alertkey: alertkey,
      },
   });
}

export { showAlert, hideAlert };
