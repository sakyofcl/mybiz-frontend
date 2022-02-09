import type from '../../constant/type';

const { SHOW_SIDE_NAV, HIDE_SIDE_NAV, TOGGLE_SIDE_NAV } = type;
function showSideNav(dispatch, popupKey) {
   dispatch({
      type: SHOW_SIDE_NAV,
   });
}

function hideSideNav(dispatch) {
   dispatch({
      type: HIDE_SIDE_NAV,
   });
}

function toggleSideNav(dispatch) {
   dispatch({
      type: TOGGLE_SIDE_NAV,
   });
}

export { showSideNav, hideSideNav, toggleSideNav };
