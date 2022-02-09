import type from '../../constant/type';

const { SHOW_LOADER, HIDE_LOADER } = type;
function showLoader(dispatch, loaderkey) {
   dispatch({
      type: SHOW_LOADER,
      payload: {
         loaderkey: loaderkey,
      },
   });
}

function hideLoader(dispatch, loaderkey) {
   dispatch({
      type: HIDE_LOADER,
      payload: {
         loaderkey: loaderkey,
      },
   });
}

export { showLoader, hideLoader };
