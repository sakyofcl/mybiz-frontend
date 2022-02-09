import type from '../constant/type';

const { SHOW_POPUP, HIDE_POPUP } = type;
function showPopup(dispatch, popupKey) {
   dispatch({
      type: SHOW_POPUP,
      payload: {
         popupKey: popupKey,
      },
   });
}

function hidePopup(dispatch, popupKey) {
   dispatch({
      type: HIDE_POPUP,
      payload: {
         popupKey: popupKey,
      },
   });
}

export { showPopup, hidePopup };
