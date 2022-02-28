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
import { updateLocation, readLocation } from '../../logic/location';

function UpdateLocation(props) {
   const { popup, location, loader, alert } = useSelector((state) => state);
   const { pos } = props;
   const updateData = location.data[pos];
   const dispatch = useDispatch();
   const formik = useFormik({
      initialValues: {
         location_id: updateData.location_id,
         name: updateData.name,
      },
      validationSchema: yup.object({
         name: yup.string().required(),
         location_id: yup.number().required(),
      }),
      onSubmit: (formData) => {
         showLoader(dispatch, loaderkey.U_LOCATION_L);
         updateLocation(dispatch, formData, (res) => {
            let status = 1;
            if (res.data.status) {
               status = 1;
            } else {
               status = 0;
               showAlert(dispatch, alertkey.U_LOCATION_ALERT, {
                  msg: res.data.message,
                  status: status,
               });
            }

            hideLoader(dispatch, loaderkey.U_LOCATION_L);
            readLocation(dispatch);
            if (status === 1) {
               hidePopup(dispatch, popupkey.U_LOCATION);
            }
         });
      },
      enableReinitialize: true,
   });
   console.log(updateData);
   return (
      <PopUp show={popup.display[popupkey.U_LOCATION]} close={(e) => hidePopup(dispatch, popupkey.U_LOCATION)} title='UPDATE LOCATION' size='md' center={true}>
         <TopLoader state={loader.display[loaderkey.U_LOCATION_L]} />
         <form onSubmit={formik.handleSubmit} autoComplete='off' className='row w-100 h-100 m-0' id='create-product-form'>
            <Col md={12}>
               <Alert
                  state={alert.display[alertkey.U_LOCATION_ALERT]}
                  close={(e) => {
                     hideAlert(dispatch, alertkey.U_LOCATION_ALERT);
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

export default UpdateLocation;
