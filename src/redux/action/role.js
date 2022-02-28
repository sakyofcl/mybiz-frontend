import type from '../../constant/type';

const { STORE_ROLE } = type;

function storeRole(dispatch, data) {
   dispatch({
      type: STORE_ROLE,
      payload: data,
   });
}

export { storeRole };
