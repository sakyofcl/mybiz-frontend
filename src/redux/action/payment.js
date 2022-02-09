import type from '../../constant/type';

const { STORE_PAYMENT } = type;

function storePayment(dispatch, data) {
   dispatch({
      type: STORE_PAYMENT,
      payload: data,
   });
}

export { storePayment };
