import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import PopUp from '../../components/Popup';
import { Row, Col } from 'react-bootstrap';
import Alert from '../../components/Alert';
import { FormItem, Text, Select } from '../../components/CustomFormItem';
import { TopLoader } from '../../components/Loader';
//Logic
import { createCustomer } from '../../logic/customer';

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

function CreateCustomer(props) {
   const dispatch = useDispatch();
   const { popup, alert, loader } = useSelector((state) => state);
   const formik = useFormik({
      initialValues: {
         name: '',
         contact: '',
         email: '',
         reg_no: '',
         address: '',
         city: '',
      },
      validationSchema: yup.object({
         name: yup.string().required('Name is required.'),
         contact: yup.string().matches(/^[0]?[0]\d{9}$/, 'wrong format.'),
         email: yup.string().email('wrong format.'),
         reg_no: yup.string(),
         address: yup.string(),
         city: yup.string(),
      }),
      onSubmit: (formData, s) => {
         showLoader(dispatch, loaderkey.C_CUSTOMER_L);
         createCustomer(formData, (res) => {
            let status = 1;
            if (res.data.status) {
               status = 1;
               formik.resetForm();
            } else {
               status = 0;
            }
            showAlert(dispatch, alertkey.C_CUSTOMER_ALERT, {
               msg: res.data.message,
               status: status,
            });

            hideLoader(dispatch, loaderkey.C_CUSTOMER_L);
         });
      },
   });

   return (
      <PopUp
         show={popup.display[popupkey.C_CUSTOMER]}
         close={(e) => {
            hidePopup(dispatch, popupkey.C_CUSTOMER);
         }}
         title='CREATE CUSTOMER'
      >
         <TopLoader state={loader.display[loaderkey.C_CUSTOMER_L]} />
         <form className='row w-100 h-100 m-0' onSubmit={formik.handleSubmit} autoComplete='off'>
            <Col md={12}>
               <Alert
                  state={alert.display[alertkey.C_CUSTOMER_ALERT]}
                  close={(e) => {
                     hideAlert(dispatch, alertkey.C_CUSTOMER_ALERT);
                  }}
               />
            </Col>
            <Col md={6}>
               <FormItem label='Name' message={formik.errors.name}>
                  <Text name='name' value={formik.values.name} change={formik.handleChange} />
               </FormItem>
            </Col>

            <Col md={6}>
               <FormItem label='Contact' message={formik.errors.contact}>
                  <Text name='contact' value={formik.values.contact} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Email' message={formik.errors.email}>
                  <Text name='email' value={formik.values.email} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Address' message={formik.errors.address}>
                  <Text name='address' value={formik.values.address} change={formik.handleChange} />
               </FormItem>
            </Col>

            <Col md={6}>
               <FormItem label='City' message={formik.errors.city}>
                  <Text name='city' value={formik.values.city} change={formik.handleChange} />
               </FormItem>
            </Col>

            <Col md={6}>
               <FormItem label='Reg No' message={formik.errors.reg_no}>
                  <Text name='reg_no' value={formik.values.reg_no} change={formik.handleChange} />
               </FormItem>
            </Col>

            <Col>
               <div className='w-100 d-flex justify-content-end'>
                  <button className='btn btn-success' type='submit'>
                     <span style={{ marginLeft: 5 }}>Save</span>
                  </button>
               </div>
            </Col>
         </form>
      </PopUp>
   );
}

export default CreateCustomer;
