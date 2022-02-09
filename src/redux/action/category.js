import type from '../../constant/type';

const { STORE_CATEGORY } = type;

function storeCategory(dispatch, data) {
   dispatch({
      type: STORE_CATEGORY,
      payload: data,
   });
}

export { storeCategory };
