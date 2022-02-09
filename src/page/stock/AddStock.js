import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import PopUp from '../../components/Popup';

import { Col } from 'react-bootstrap';
import Alert from '../../components/Alert';
import { FormItem, Text, Select, Option } from '../../components/CustomFormItem';
import { TopLoader } from '../../components/Loader';

//Logic
import { fetchProductInfo } from '../../logic/product';
import { fetchSupplierData } from '../../logic/supplier';
import { fetchReceiverData } from '../../logic/receiver';
import { saveStockIn, readStockIn } from '../../logic/stock';
//action
import { hidePopup } from '../../redux/action/popup';
import { showAlert, hideAlert } from '../../redux/action/alert';
import { showLoader, hideLoader } from '../../redux/action/loader';
//constant
import { alertkey } from '../../constant/alertkey';
import { popupkey } from '../../constant/popupkey';
import { loaderkey } from '../../constant/loaderkey';

function AddStock(props) {
   const dispatch = useDispatch();
   const { deliverymode, supplier, receiver, popup, loader, alert } = useSelector((state) => state);
   const date = new Date();
   useEffect(() => {
      //fetchSupplierData(dispatch, 'code');
      //fetchReceiverData(dispatch);
   }, []);

   const formik = useFormik({
      initialValues: {
         barcode: '',
         qty: '',
         price: '',
         remark: '',
         name: '',
         delivery_mode_id: '',
         supplier_id: '',
         received_date: date.toISOString().substring(0, 10) + 'T' + date.getHours() + ':' + date.getMinutes(),
         receiver: '',
      },
      validationSchema: yup.object({
         barcode: yup.number().required('Barcode is required.'),
         qty: yup.number().required('Quantity is required.'),
         price: yup.number(),
      }),
      onSubmit: (formData) => {
         showLoader(dispatch, loaderkey.C_STOCK_L);
         saveStockIn(dispatch, formData, (res) => {
            let status = 1;
            if (res.data.status) {
               status = 1;
               formik.resetForm();
            } else {
               status = 0;
            }

            showAlert(dispatch, alertkey.C_STOCK_ALERT, {
               msg: res.data.message,
               status: status,
            });
            hideLoader(dispatch, loaderkey.C_STOCK_L);
            readStockIn(dispatch);
         });
      },
   });

   return (
      <>
         <PopUp
            show={popup.display[popupkey.C_STOCK]}
            close={(e) => {
               hidePopup(dispatch, popupkey.C_STOCK);
            }}
            title='ADD STOCK IN TO STORE'
         >
            <TopLoader state={loader.display[loaderkey.C_STOCK_L]} />
            <form onSubmit={formik.handleSubmit} autoComplete='off' className='row w-100 h-100 m-0' id='add-stock-form'>
               <Col md={12}>
                  <Alert
                     state={alert.display[alertkey.C_STOCK_ALERT]}
                     close={(e) => {
                        hideAlert(dispatch, alertkey.C_STOCK_ALERT);
                     }}
                  />
               </Col>

               <Col md={6}>
                  <FormItem label='Barcode' message={formik.errors.barcode}>
                     <Text
                        name='barcode'
                        value={formik.values.barcode}
                        change={(e) => {
                           formik.setFieldValue('barcode', e.target.value);
                           fetchProductInfo('barcode', e.target.value, 'name1,sell_price', (data) => {
                              if (data) {
                                 formik.setFieldValue('name', data.name1);
                                 formik.setFieldValue('price', data.sell_price);
                              } else {
                                 formik.setFieldValue('name', '');
                              }
                           });
                        }}
                     />
                  </FormItem>
               </Col>

               <Col md={6}>
                  <FormItem label='Product Name'>
                     <Text name='name' value={formik.values.name} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='Quantity' message={formik.errors.qty}>
                     <Text name='qty' value={formik.values.qty} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='New Price' message={formik.errors.price}>
                     <Text name='price' value={formik.values.price} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Supplier'>
                     <Select
                        name='supplier_id'
                        value={formik.values.supplier_id}
                        change={formik.handleChange}
                        render={() => {
                           return supplier.supplierCode.map((v, i) => {
                              return <Option v={v.supplier_id} t={v.code} key={i} />;
                           });
                        }}
                     />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Delivery Mode'>
                     <Select
                        name='delivery_mode_id'
                        value={formik.values.delivery_mode_id}
                        change={formik.handleChange}
                        render={() => {
                           return deliverymode.data.map((v, i) => {
                              return <Option v={v.delivery_mode_id} t={v.name} key={i} />;
                           });
                        }}
                     />
                  </FormItem>
               </Col>

               <Col md={4}>
                  <FormItem label='Received Date'>
                     <Text type='datetime-local' name='received_date' value={formik.values.received_date} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Receiver'>
                     <Select
                        name='receiver'
                        value={formik.values.receiver}
                        change={formik.handleChange}
                        render={() => {
                           return receiver.receiverCode.map((v, i) => {
                              return <Option v={v.id} t={v.name} key={i} />;
                           });
                        }}
                     />
                  </FormItem>
               </Col>

               <Col md={8}>
                  <FormItem label='Stock Remark'>
                     <Text name='remark' value={formik.values.remark} change={formik.handleChange} />
                  </FormItem>
               </Col>

               <Col>
                  <div className='w-100 d-flex justify-content-end'>
                     <button className='btn btn-primary' type='submit'>
                        <span style={{ marginLeft: 5 }}>Add Stock</span>
                     </button>
                  </div>
               </Col>
            </form>
         </PopUp>
      </>
   );
}

export default AddStock;
