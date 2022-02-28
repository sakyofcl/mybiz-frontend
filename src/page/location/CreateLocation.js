import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
//component
import PopUp from '../../components/Popup';
import Alert from '../../components/Alert';
import { FormItem, Text, Select, Option } from '../../components/CustomFormItem';
import { TopLoader } from '../../components/Loader';

//constant
import { alertkey } from '../../constant/alertkey';
import { popupkey } from '../../constant/popupkey';
import { loaderkey } from '../../constant/loaderkey';
//action
import { hidePopup } from '../../redux/action/popup';
import { hideLoader, showLoader } from '../../redux/action/loader';
import { hideAlert, showAlert } from '../../redux/action/alert';
//logic
import { createLocation, readLocation } from '../../logic/location';

function CreateLocation(props) {
   const { popup, loader, alert } = useSelector((state) => state);

   const dispatch = useDispatch();
   const formik = useFormik({
      initialValues: {
         name: '',
      },
      validationSchema: yup.object({
         name: yup.string().required('Name is required.'),
      }),
      onSubmit: (formData) => {
         showLoader(dispatch, loaderkey.C_LOCATION_L);

         createLocation(dispatch, formData, (res) => {
            let status = 1;
            if (res.data.status) {
               status = 1;
               formik.resetForm();
            } else {
               status = 0;
               showAlert(dispatch, alertkey.C_LOCATION_ALERT, {
                  msg: res.data.message,
                  status: status,
               });
            }

            hideLoader(dispatch, loaderkey.C_LOCATION_L);
            readLocation(dispatch);
         });
      },
   });
   return (
      <PopUp show={popup.display[popupkey.C_LOCATION]} close={(e) => hidePopup(dispatch, popupkey.C_LOCATION)} title='CREATE LOCATION' size='md' center={true}>
         <TopLoader state={loader.display[loaderkey.C_LOCATION_L]} />
         <form onSubmit={formik.handleSubmit} autoComplete='off' className='row w-100 h-100 m-0' id='create-product-form'>
            <Col md={12}>
               <Alert
                  state={alert.display[alertkey.C_LOCATION_ALERT]}
                  close={(e) => {
                     hideAlert(dispatch, alertkey.C_LOCATION_ALERT);
                  }}
               />
            </Col>
            <Col md={12}>
               <FormItem label='Location Name' message={formik.errors.name}>
                  <Text name='name' value={formik.values.name} change={formik.handleChange} />
               </FormItem>
            </Col>

            <Col md={12}>
               <div className='w-100 d-flex justify-content-end'>
                  <button className='btn btn-success' form='create-product-form' type='submit'>
                     <span style={{ marginLeft: 5 }}>Save Changes</span>
                  </button>
               </div>
            </Col>
         </form>
      </PopUp>
   );
}

export default CreateLocation;
