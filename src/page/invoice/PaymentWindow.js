import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
//components
import PopUp from '../../components/Popup';
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import { FormItem, Text, Select, DatePicker, Option } from '../../components/CustomFormItem';
import { ActionButton } from '../../components/ActionButton';
import Alert from '../../components/Alert';
import { TopLoader } from '../../components/Loader';
//constant
import { popupkey } from '../../constant/popupkey';
import { alertkey } from '../../constant/alertkey';
import { loaderkey } from '../../constant/loaderkey';
//action
import { hidePopup } from '../../redux/action/popup';
import { hideAlert, showAlert } from '../../redux/action/alert';
import { hideLoader, showLoader } from '../../redux/action/loader';
import { readInvoice } from '../../logic/invoice';
import { addPayment } from '../../logic/payment';

function PaymentWindow(props) {
   const amountText = React.createRef();
   const { pos } = props;
   const dispatch = useDispatch();
   const { popup, invoice, alert, loader } = useSelector((state) => state);
   const formik = useFormik({
      initialValues: {
         method: 'cash',
         date: new Date().toISOString().substring(0, 10),
         amount: '',
         refrence: '',
         invoice_id: invoice.data[pos].invoice_id,
      },
      validationSchema: yup.object({
         method: yup.string().required('Payment method is required.'),
         date: yup.date().required('Payment date is required.'),
         amount: yup.number().required('Payment amount is required.'),
      }),
      onSubmit: (formData) => {
         showLoader(dispatch, loaderkey.C_PAYMENT_L);
         addPayment(dispatch, formData, (res) => {
            let status = 0;
            if (res.data.status) {
               status = 1;
               readInvoice(dispatch, false);
               formik.resetForm();
            } else {
               status = 0;
            }

            showAlert(dispatch, alertkey.C_PAYMENT_ALERT, {
               msg: res.data.message,
               status: status,
            });

            hideLoader(dispatch, loaderkey.C_PAYMENT_L);
         });
      },
   });

   useEffect(() => {
      amountText.current.focus();
   }, []);

   return (
      <PopUp size='md' center={true} show={popup.display[popupkey.PAYMENT_WINDOW]} close={() => hidePopup(dispatch, popupkey.PAYMENT_WINDOW)} title='ADD PAYMENT'>
         <TopLoader state={loader.display[loaderkey.C_PAYMENT_L]} />
         <form className='row' onSubmit={formik.handleSubmit} autoComplete='off'>
            <div className='col-12'>
               <Alert
                  state={alert.display[alertkey.C_PAYMENT_ALERT]}
                  close={(e) => {
                     hideAlert(dispatch, alertkey.C_PAYMENT_ALERT);
                  }}
               />
            </div>
            <div className='col-12 col-md-6'>
               <FormItem label='Method' message={formik.errors.mathod}>
                  <Select
                     name='method'
                     value={formik.values.method}
                     change={formik.handleChange}
                     render={() => {
                        return (
                           <>
                              <Option v='cash' t='Cash' />
                              <Option v='card' t='Card' />
                              <Option v='cheque' t='Cheque' />
                           </>
                        );
                     }}
                  />
               </FormItem>
            </div>
            <div className='col-12 col-md-6'>
               <FormItem label='Date' message={formik.errors.date}>
                  <DatePicker name='date' value={formik.values.date} change={formik.handleChange} />
               </FormItem>
            </div>

            <div className='col-12 col-md-6'>
               <FormItem label='Refrence'>
                  <Text name='refrence' value={formik.values.refrence} change={formik.handleChange} />
               </FormItem>
            </div>
            <div className='col-12 col-md-6'>
               <FormItem label='Amount' message={formik.errors.amount}>
                  <Text name='amount' value={formik.values.amount} change={formik.handleChange} af={popup.display[popupkey.ADD_INVOICE_PAYMENT]} ref={amountText} />
               </FormItem>
            </div>
            <div className='col-12 d-flex justify-content-between'>
               <ActionButton
                  text='CLEAR'
                  cls='btn-danger'
                  click={(e) => {
                     formik.resetForm();
                  }}
               />
               <ActionButton text='ADD' cls='btn-success' type='submit' />
            </div>
         </form>
         {/*
              <div className='row mt-4'>
            {invoice.payment.map((v, i) => {
               return (
                  <div className='col-12 mb-2' key={i}>
                     <div className='d-flex justify-content-between bg-dark h-100 curve p-2'>
                        <div className='w-100 h-100 d-flex flex-wrap text-white align-items-center'>
                           <span style={{ marginRight: 10, fontSize: 13 }}>{v.method}</span>
                           <span style={{ marginRight: 10, fontSize: 13 }}>Rs {v.amount}</span>
                           <span style={{ marginRight: 10, fontSize: 13 }}>{v.date}</span>
                           {v.refrence ? <span style={{ marginRight: 10, fontSize: 13 }}>#{v.refrence}</span> : ''}
                        </div>
                        <div className='h-100'>
                           <ActionButton
                              ico='close'
                              cls='btn-danger'
                              click={(e) => {
                                 removeInvoicePayment(dispatch, { key: i });
                                 calculateInvoiceAmount(dispatch, { key: 'balance' });
                              }}
                           />
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
             
             */}
      </PopUp>
   );
}

export { PaymentWindow };
