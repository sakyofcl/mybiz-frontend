import type from '../../constant/type';

const { STORE_CUSTOMERTYPE } = type;

function storeCustomerType(dispatch, data) {
   dispatch({
      type: STORE_CUSTOMERTYPE,
      payload: data,
   });
}

export { storeCustomerType };
