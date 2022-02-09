import type from '../../constant/type';
const { STORE_DELIVERYMODE } = type;

function storeDeliveryMode(dispatch, data) {
   dispatch({
      type: STORE_DELIVERYMODE,
      payload: {
         ...data,
      },
   });
}

export { storeDeliveryMode };
