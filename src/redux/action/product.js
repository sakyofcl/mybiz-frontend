import type from '../../constant/type';

const { STORE_PRODUCT, STORE_NEXT_BARCODE } = type;

function storeProduct(dispatch, data) {
   dispatch({
      type: STORE_PRODUCT,
      payload: data,
   });
}

function storeNextBarcode(dispatch, data) {
   dispatch({
      type: STORE_NEXT_BARCODE,
      payload: data,
   });
}

export { storeProduct, storeNextBarcode };
