import type from '../../constant/type';

const { STORE_MODULE_GROUP } = type;

function storeModuleGroup(dispatch, data = {}) {
   dispatch({
      type: STORE_MODULE_GROUP,
      payload: data,
   });
}

export { storeModuleGroup };
