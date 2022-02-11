import type from '../../constant/type';

const { STORE_INVOICE_CUSTOMERS, STORE_INVOICE_CUSTOMER_INFO, STORE_INVOICE_DATE, STORE_INVOICE } = type;

function storeInvoice(dispatch, data) {
   dispatch({
      type: STORE_INVOICE,
      payload: data,
   });
}

function storeInvoiceCustomerInfo(dispatch, data) {
   dispatch({
      type: STORE_INVOICE_CUSTOMER_INFO,
      payload: {
         data: { ...data },
      },
   });
}
function storeInvoiceCustomers(dispatch, data) {
   dispatch({
      type: STORE_INVOICE_CUSTOMERS,
      payload: {
         data: data,
      },
   });
}
function storeInvoiceDate(dispatch, date) {
   dispatch({
      type: STORE_INVOICE_DATE,
      payload: {
         date: date,
      },
   });
}

function storeInvoiceItem(dispatch, data = {}) {
   dispatch({
      type: type.STORE_INVOICE_ITEM,
      payload: {
         data: { ...data },
      },
   });
}

function setInvoiceFilterItem(dispatch, data = {}) {
   dispatch({
      type: type.SET_FILTER_INVOICE_DATA,
      payload: { ...data },
   });
}
function storeInvoiceDiscount(dispatch, data = {}) {
   dispatch({
      type: type.STORE_INVOICE_DISCOUNT,
      payload: { ...data },
   });
}
function calculateInvoiceAmount(dispatch, data = {}) {
   dispatch({
      type: type.CALCULATE_INVOICE_AMOUNTS,
      payload: { ...data },
   });
}
function resetInvoice(dispatch) {
   dispatch({
      type: type.RESET_INVOICE,
   });
}
function storePaymentStatus(dispatch, data = {}) {
   dispatch({
      type: type.STORE_PAYMENT_STATUS,
      payload: { ...data },
   });
}

function storeInvoiceRemark(dispatch, data = {}) {
   dispatch({
      type: type.STORE_INVOICE_REMARK,
      payload: { ...data },
   });
}
function addNewInvoiceItem(dispatch) {
   dispatch({
      type: type.ADD_NEW_INVOICE_ITEM,
   });
}

function removeInvoiceItem(dispatch, data = {}) {
   dispatch({
      type: type.REMOVE_INVOICE_ITEM,
      payload: { ...data },
   });
}

function storeInvoicePayment(dispatch, data = {}) {
   dispatch({
      type: type.STORE_INVOICE_PAYMENT,
      payload: { ...data },
   });
}

function removeInvoicePayment(dispatch, data = {}) {
   dispatch({
      type: type.REMOVE_INVOICE_PAYMENT,
      payload: { ...data },
   });
}

function storeNextINvoiceNo(dispatch, data = {}) {
   dispatch({
      type: type.STORE_NEXT_INVOICE_NO,
      payload: { ...data },
   });
}

function storeSalesRef(dispatch, data = {}) {
   dispatch({
      type: type.STORE_SALES_REF,
      payload: { ...data },
   });
}

function storeFetchSalesRef(dispatch, data = {}) {
   dispatch({
      type: type.STORE_FETCH_SALES_REF,
      payload: { ...data },
   });
}

export { storeFetchSalesRef, storeSalesRef, storeNextINvoiceNo, storeInvoiceCustomerInfo, storeInvoiceCustomers, storeInvoiceDate, storeInvoiceItem, setInvoiceFilterItem, storeInvoiceDiscount, calculateInvoiceAmount, resetInvoice, storeInvoice, storePaymentStatus, storeInvoiceRemark, addNewInvoiceItem, removeInvoiceItem, storeInvoicePayment, removeInvoicePayment };
