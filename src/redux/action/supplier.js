import type from '../../constant/type';

const { STORE_SUPPLIER_CODE } = type;

function storeSupplierCode(dispatch, data) {
   dispatch({
      type: STORE_SUPPLIER_CODE,
      payload: {
         code: data,
      },
   });
}

export { storeSupplierCode };
