import axios from 'axios';
import api from '../../../../constant/api';
//action
import { hidePopup, showPopup } from '../../../../redux/action/popup';
import { showAlert, hideAlert } from '../../../../redux/action/alert';
import { showLoader, hideLoader } from '../../../../redux/action/loader';
import { resetInvoice } from '../../../../redux/action/invoice';
//constant
import { alertkey } from '../../../../constant/alertkey';
import { popupkey } from '../../../../constant/popupkey';
import { loaderkey } from '../../../../constant/loaderkey';

function onClickSaveInvoice(e, dispatch, invoice) {
   let saveType = e.target.dataset.type;
   var {
      invoiceFeild,
      finalTotal: { discount },
      invoiceDate,
      customer: { customer_id },
      payment_status,
      remark: { one, two },
      payment,
   } = invoice;

   let uploadPayload = {
      customer: customer_id,
      invoice_date: invoiceDate,
      user: 1,
      item: [],
      total_discount: discount ? discount : 0,
      payment_status: payment_status,
      remark1: one,
      remark2: two,
      payment: [],
   };

   //SET INVOICE ITEMS
   Object.keys(invoiceFeild).map((v) => {
      const { pid, name, qty, price, discount } = invoiceFeild[v];

      if (name && qty && price && discount !== '' && pid) {
         let item = {
            name: name ? name : '',
            qty: qty ? qty : 1,
            price: price ? price : 1,
            discount: discount ? discount : 0,
            pid: pid,
         };
         uploadPayload.item.push(item);
      }
   });

   //SET PAYMENT
   payment.map((v) => {
      uploadPayload.payment.push({
         method: v.method,
         date: v.date,
         amount: parseFloat(v.amount),
         refrence: 'refrence' in v ? v.refrence : null,
      });
   });

   // IF USER NO SELECT PRODUCT IT WILL NOT SAVE !
   if (uploadPayload.item.length > 0) {
      showLoader(dispatch, loaderkey.C_INVOICE_L);
      let config = { headers: { 'Content-Type': 'application/json' } };

      axios.post(api.createInvoice, uploadPayload, config).then((res) => {
         if (res.data.status) {
            resetInvoice(dispatch);
            hideLoader(dispatch, loaderkey.C_INVOICE_L);
            showAlert(dispatch, alertkey.C_INVOICE_ALERT, {
               msg: res.data.message,
               status: 1,
            });
         } else {
            showAlert(dispatch, alertkey.C_INVOICE_ALERT, {
               msg: res.data.message,
               status: 0,
            });
         }
      });
   } else {
      showAlert(dispatch, alertkey.C_INVOICE_ALERT, {
         msg: 'no product selected.',
         status: 0,
      });
   }
}

export { onClickSaveInvoice };
