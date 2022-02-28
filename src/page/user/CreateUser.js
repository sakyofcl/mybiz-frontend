import { Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

//component
import PopUp from '../../components/Popup';
import Alert from '../../components/Alert';
import { FormItem, Text, Select, Option } from '../../components/CustomFormItem';
import { TopLoader } from '../../components/Loader';
//constant
import { loaderkey } from '../../constant/loaderkey';
import { popupkey } from '../../constant/popupkey';
import { alertkey } from '../../constant/alertkey';
//action
import { hideLoader, showLoader } from '../../redux/action/loader';
import { hideAlert, showAlert } from '../../redux/action/alert';
import { hidePopup } from '../../redux/action/popup';
//logic
import { createUser, readUser } from '../../logic/user';

function CreateUser(props) {
   const { popup, loader, alert, role } = useSelector((state) => state);
   //const { pos } = props;
   //const updateData = customer.data[pos];
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         user_id: '',
         email: '',
         name: '',
         password: '',
         contact: '',
         role_id: role.data.length > 0 ? role.data[0].role_id : '',
      },
      validationSchema: yup.object({
         email: yup.string().required('Email is required.').email('wrong format.'),
         name: yup.string().required('Name is required.'),
         password: yup.string().required('Password is required.').min(5, 'At least 5 characters must.').max(15, 'Maximum 15 characters allowed.'),
         contact: yup.string().matches(/^[0]?[0]\d{9}$/, 'wrong format.'),
         role_id: yup.number().required('Role is required.'),
      }),
      onSubmit: (formData, s) => {
         showLoader(dispatch, loaderkey.C_USER_L);
         createUser(dispatch, formData, (res) => {
            let status = 1;
            if (res.data.status) {
               status = 1;
               readUser(dispatch, false);
               formik.resetForm();
            } else {
               status = 0;
            }
            showAlert(dispatch, alertkey.C_USER_ALERT, {
               msg: res.data.message,
               status: status,
            });

            hideLoader(dispatch, loaderkey.C_USER_L);
         });
      },
      enableReinitialize: true,
   });

   return (
      <PopUp show={popup.display[popupkey.C_USER]} close={(e) => hidePopup(dispatch, popupkey.C_USER)} title='CREATE USER' size='md' center={false}>
         <TopLoader state={loader.display[loaderkey.C_USER_L]} />
         <form onSubmit={formik.handleSubmit} autoComplete='off' className='row w-100 h-100 m-0'>
            <Col md={12}>
               <Alert
                  state={alert.display[alertkey.C_USER_ALERT]}
                  close={(e) => {
                     hideAlert(dispatch, alertkey.C_USER_ALERT);
                  }}
               />
            </Col>
            <Col md={6}>
               <FormItem label='Name' message={formik.errors.name}>
                  <Text name='name' value={formik.values.name} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Email' message={formik.errors.email}>
                  <Text name='email' value={formik.values.email} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Password' message={formik.errors.password}>
                  <Text name='password' value={formik.values.password} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Role' message={formik.errors.role_id}>
                  <Select
                     name='role_id'
                     value={formik.values.role_id}
                     change={formik.handleChange}
                     render={() => {
                        return role.data.map((v, i) => {
                           return <Option v={v.role_id} t={v.name} key={i} />;
                        });
                     }}
                  />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Contact' message={formik.errors.contact}>
                  <Text name='contact' value={formik.values.contact} change={formik.handleChange} />
               </FormItem>
            </Col>

            <Col md={12}>
               <div className='w-100  d-flex justify-content-end '>
                  <button className='btn btn-success' type='submit'>
                     <span style={{ marginLeft: 5 }}>Save Changes</span>
                  </button>
               </div>
            </Col>
         </form>
      </PopUp>
   );
}

export default CreateUser;
