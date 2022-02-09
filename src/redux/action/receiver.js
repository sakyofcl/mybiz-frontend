import type from '../../constant/type';

const { STORE_RECEIVER_CODE } = type;

function storeReceiverCode(dispatch, data) {
   dispatch({
      type: STORE_RECEIVER_CODE,
      payload: {
         code: data,
      },
   });
}

export { storeReceiverCode };
