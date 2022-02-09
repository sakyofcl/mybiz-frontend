import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

//components
import PopUp from '../../components/Popup';
import { Col } from 'react-bootstrap';
import Alert from '../../components/Alert';
import { FormItem, Text, Select, Option } from '../../components/CustomFormItem';
import { TopLoader } from '../../components/Loader';
//Logic
import { createProduct } from '../../logic/product';
import { fetchProduct, checkBarcode, getNextBarcode } from '../../logic/product';
//constant
import { alertkey } from '../../constant/alertkey';
import { popupkey } from '../../constant/popupkey';
import { loaderkey } from '../../constant/loaderkey';
//action
import { hidePopup } from '../../redux/action/popup';
import { hideAlert, showAlert } from '../../redux/action/alert';
import { hideLoader, showLoader } from '../../redux/action/loader';

//lib
import { ChangeState } from '../../lib/ChangeState';

function CreateProduct(props) {
   const dispatch = useDispatch();
   const { category, popup, alert, location, unit, loader, product } = useSelector((state) => state);
   const [state, setState] = useState({
      subcat: [],
   });

   const formik = useFormik({
      initialValues: {
         barcode: product.nextBarcode,
         cat_id: '',
         subcat_id: '',
         location_id: location.data.length > 0 ? location.data[0].location_id : '',
         name1: '',
         name2: '',
         qty: '0',
         unit: '1',
         re_order_level: '0',
         cash_price: '0',
         cost_price: '0',
         max_price: '0',
         sell_price: '0',
         discount: '0',
         vat: '0',
      },
      validationSchema: yup.object({
         barcode: yup.number().required('Barcode is required.').min(10000000, 'Minimum barcode 10000000.'),
         cat_id: yup.number().required(),
         subcat_id: yup.number(),
         location_id: yup.number(),
         name1: yup.string().required(),
         name2: yup.string(),
         qty: yup.number(),
         unit: yup.string(),
         re_order_level: yup.number(),
         cash_price: yup.number(),
         cost_price: yup.number(),
         max_price: yup.number(),
         sell_price: yup.number(),
         discount: yup.number(),
         vat: yup.number(),
      }),
      onSubmit: (formData, s) => {
         showLoader(dispatch, loaderkey.C_PRODUCT_L);
         createProduct(dispatch, formData, (res) => {
            let status = 1;
            if (res.data.status) {
               status = 1;

               formik.resetForm({
                  values: {
                     barcode: '',
                     cat_id: formik.values.cat_id,
                     subcat_id: formik.values.subcat_id,
                     location_id: formik.values.location_id,
                     name1: '',
                     name2: '',
                     qty: '0',
                     unit: '1',
                     re_order_level: '0',
                     cash_price: '0',
                     cost_price: '0',
                     max_price: '0',
                     sell_price: '0',
                     discount: '0',
                     vat: '0',
                  },
               });
               getNextBarcode(dispatch);
            } else {
               status = 0;
            }
            showAlert(dispatch, alertkey.C_PRODUCT_ALERT, {
               msg: res.data.message,
               status: status,
            });
            hideLoader(dispatch, loaderkey.C_PRODUCT_L);

            fetchProduct(dispatch);

            if (formData.action === 'save') {
               hidePopup(dispatch, popupkey.C_PRODUCT);
               hideAlert(dispatch, alertkey.C_PRODUCT_ALERT);
            }
         });
      },
      enableReinitialize: true,
   });

   return (
      <>
         <PopUp
            show={popup.display[popupkey.C_PRODUCT]}
            close={(e) => {
               hidePopup(dispatch, popupkey.C_PRODUCT);
            }}
            title='CREATE PRODUCT'
         >
            <TopLoader state={loader.display[loaderkey.C_PRODUCT_L]} />

            <form onSubmit={formik.handleSubmit} autoComplete='off' className='row w-100 h-100 m-0' id='create-product-form'>
               <Col md={12}>
                  <Alert
                     state={alert.display[alertkey.C_PRODUCT_ALERT]}
                     close={(e) => {
                        hideAlert(dispatch, alertkey.C_PRODUCT_ALERT);
                     }}
                  />
               </Col>
               <Col md={12}>
                  <FormItem label='Barcode Number' message={formik.errors.barcode}>
                     <Text
                        name='barcode'
                        value={formik.values.barcode}
                        change={(e) => {
                           formik.setFieldValue('barcode', e.target.value);
                           checkBarcode(e.target.value, (data) => {
                              if (data.exists) {
                                 formik.setFieldError('barcode', 'This barcode already exists tell another one.');
                              }
                           });
                        }}
                     />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Category' message={formik.errors.cat_id}>
                     <Select
                        name='cat_id'
                        value={formik.values.cat_id}
                        change={(e) => {
                           formik.setFieldValue('cat_id', e.target.value);
                           category.data.map((v, i) => {
                              if (e.target.value == v.cat_id) {
                                 setState(
                                    ChangeState(state, {
                                       subcat: v.subCategory,
                                    })
                                 );
                              }
                           });
                        }}
                        render={() => {
                           return category.data.map((v, i) => {
                              return <Option v={v.cat_id} t={v.name} key={i} />;
                           });
                        }}
                     />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Sub Category' message={formik.errors.subcat_id}>
                     <Select
                        name='subcat_id'
                        value={formik.values.subcat_id}
                        change={formik.handleChange}
                        render={() => {
                           return state.subcat.map((v, i) => {
                              return <Option v={v.subcat_id} t={v.name} key={i} />;
                           });
                        }}
                     />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Location' message={formik.errors.location_id}>
                     <Select
                        name='location_id'
                        value={formik.values.location_id}
                        change={formik.handleChange}
                        render={() => {
                           return location.data.map((v, i) => {
                              return <Option v={v.location_id} t={v.name} key={i} />;
                           });
                        }}
                     />
                  </FormItem>
               </Col>

               <Col md={6}>
                  <FormItem label='Name 1' message={formik.errors.name1}>
                     <Text name='name1' value={formik.values.name1} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='Name 2' message={formik.errors.name2}>
                     <Text name='name2' value={formik.values.name2} change={formik.handleChange} />
                  </FormItem>
               </Col>

               <Col md={4}>
                  <FormItem label='Unit' message={formik.errors.unit}>
                     <Select
                        name='unit'
                        value={formik.values.unit}
                        change={formik.handleChange}
                        render={() => {
                           return unit.data.map((v, i) => {
                              return <Option v={v.unit} t={v.name} key={i} />;
                           });
                        }}
                     />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Quantity' message={formik.errors.qty}>
                     <Text name='qty' value={formik.values.qty} change={formik.handleChange} />
                  </FormItem>
               </Col>

               <Col md={4}>
                  <FormItem label='RO Level' message={formik.errors.re_order_level}>
                     <Text name='re_order_level' value={formik.values.re_order_level} change={formik.handleChange} />
                  </FormItem>
               </Col>

               <Col md={4}>
                  <FormItem label='Cost Price' message={formik.errors.cost_price}>
                     <Text name='cost_price' value={formik.values.cost_price} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Max Price' message={formik.errors.max_price}>
                     <Text name='max_price' value={formik.values.max_price} change={formik.handleChange} />
                  </FormItem>
               </Col>

               <Col md={4}>
                  <FormItem label='Sell Price' message={formik.errors.sell_price}>
                     <Text name='sell_price' value={formik.values.sell_price} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Cash Price' message={formik.errors.cash_price}>
                     <Text name='cash_price' value={formik.values.cash_price} change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Discount' message={formik.errors.discount}>
                     <Text value={formik.values.discount} name='discount' change={formik.handleChange} />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Vat' message={formik.errors.vat}>
                     <Text value={formik.values.vat} name='vat' change={formik.handleChange} />
                  </FormItem>
               </Col>

               <Col md={12}>
                  <div className='w-100 d-flex justify-content-between'>
                     <button className='btn btn-primary' form='create-product-form' type='submit' onClick={(e) => formik.setFieldValue('action', 'new')}>
                        <span style={{ marginLeft: 5 }}>Add New</span>
                     </button>
                     <button className='btn btn-success' form='create-product-form' type='submit' onClick={(e) => formik.setFieldValue('action', 'save')}>
                        <span style={{ marginLeft: 5 }}>Save</span>
                     </button>
                  </div>
               </Col>
            </form>
         </PopUp>
      </>
   );
}

export default CreateProduct;
