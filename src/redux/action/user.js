import type from '../../constant/type';

const { STORE_USER } = type;

function storeUser(dispatch, data) {
   dispatch({
      type: STORE_USER,
      payload: data,
   });
}

export { storeUser };
