import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

//components
import AppButton from '../../components/AppButton';
import { FormItem, Text } from '../../components/CustomFormItem';
import Alert from '../../components/Alert';

//constant
import { loaderkey } from '../../constant/loaderkey';
import { popupkey } from '../../constant/popupkey';
import { alertkey } from '../../constant/alertkey';
//action
import { hideLoader, showLoader } from '../../redux/action/loader';
import { hideAlert, showAlert } from '../../redux/action/alert';
import { hidePopup } from '../../redux/action/popup';
//logic
import { authLogin } from '../../logic/auth';

function Login() {
   const { popup, loader, alert, role } = useSelector((state) => state);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: yup.object({
         email: yup.string().required('Email is required.').email('wrong format.'),
         password: yup.string().required('Password is required.').min(5, 'At least 5 characters must.').max(15, 'Maximum 15 characters allowed.'),
      }),
      onSubmit: (formData) => {
         authLogin(dispatch, formData, navigate);
      },
   });

   return (
      <div className='vh-100 w-100 d-flex justify-content-center align-items-center app-login'>
         <div className='card' style={{ width: '30%' }}>
            <div className='card-header d-flex justify-content-center align-items-center'>Soft Magic Kalmunai</div>
            <div className='card-body'>
               <div className='w-100'>
                  <Alert
                     state={alert.display[alertkey.AUTH_LOGIN_ALERT]}
                     close={(e) => {
                        hideAlert(dispatch, alertkey.AUTH_LOGIN_ALERT);
                     }}
                  />
               </div>
               <form onSubmit={formik.handleSubmit} autoComplete='off' className='row w-100 h-100 m-0'>
                  <FormItem label='Email' message={formik.errors.email}>
                     <Text name='email' value={formik.values.email} change={formik.handleChange} />
                  </FormItem>
                  <FormItem label='Password' message={formik.errors.password}>
                     <Text name='password' value={formik.values.password} change={formik.handleChange} />
                  </FormItem>

                  <div class='card-footer text-muted d-flex justify-content-center'>
                     <AppButton text='Login' cls='btn-danger w-100' type='submit' load={loader.display[loaderkey.AUTH_LOGIN_L].active} />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;
