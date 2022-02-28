import { Row, Col } from 'react-bootstrap';
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
import { readCustomer, updateCustomer } from '../../logic/customer';

function UpdateCustomer(props) {
   const { popup, customer, loader, alert, customertype } = useSelector((state) => state);
   const { pos } = props;
   const updateData = customer.data[pos];
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         customer_id: updateData.cid,
         name: updateData.name ? updateData.name : '',
         contact: updateData.contact ? updateData.contact : '',
         email: updateData.email ? updateData.email : '',
         reg_no: updateData.reg_no ? updateData.reg_no : '',
         address: updateData.address ? updateData.address : '',
         city: updateData.city ? updateData.city : '',
         type_id: updateData.type_id ? updateData.type_id : '',
         status: updateData.status ? updateData.status : '',
      },
      validationSchema: yup.object({
         name: yup.string().required('Name is required.'),
         status: yup.string().required('Status is required.'),
         contact: yup.string().matches(/^[0]?[0]\d{9}$/, 'wrong format.'),
         email: yup.string().email('wrong format.'),
         reg_no: yup.string(),
         address: yup.string(),
         city: yup.string(),
      }),
      onSubmit: (formData, s) => {
         showLoader(dispatch, loaderkey.U_CUSTOMER_L);
         updateCustomer(dispatch, formData, (res) => {
            let status = 1;
            if (res.data.status) {
               status = 1;
               readCustomer(dispatch, false);
            } else {
               status = 0;
            }
            showAlert(dispatch, alertkey.U_CUSTOMER_ALERT, {
               msg: res.data.message,
               status: status,
            });

            hideLoader(dispatch, loaderkey.U_CUSTOMER_L);
         });
      },
   });

   return (
      <PopUp show={popup.display[popupkey.U_CUSTOMER]} close={(e) => hidePopup(dispatch, popupkey.U_CUSTOMER)} title='UPDATE CUSTOMER' size='md' center={true}>
         <TopLoader state={loader.display[loaderkey.U_CUSTOMER_L]} />
         <form onSubmit={formik.handleSubmit} autoComplete='off' className='row w-100 h-100 m-0'>
            <Col md={12}>
               <Alert
                  state={alert.display[alertkey.U_CUSTOMER_ALERT]}
                  close={(e) => {
                     hideAlert(dispatch, alertkey.U_CUSTOMER_ALERT);
                  }}
               />
            </Col>
            <Col md={6}>
               <FormItem label='Name' message={formik.errors.name}>
                  <Text name='name' value={formik.values.name} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Name' message={formik.errors.name}>
                  <Select
                     name='type_id'
                     value={formik.values.type_id}
                     change={formik.handleChange}
                     render={() => {
                        return customertype.data.map((v, i) => {
                           return <Option v={v.type_id} t={v.name} key={i} />;
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
            <Col md={6}>
               <FormItem label='Email' message={formik.errors.email}>
                  <Text name='email' value={formik.values.email} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Reg No' message={formik.errors.reg_no}>
                  <Text name='reg_no' value={formik.values.reg_no} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='City' message={formik.errors.city}>
                  <Text name='city' value={formik.values.city} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Address' message={formik.errors.address}>
                  <Text name='address' value={formik.values.address} change={formik.handleChange} />
               </FormItem>
            </Col>
            <Col md={6}>
               <FormItem label='Status' message={formik.errors.status}>
                  <Select
                     name='status'
                     value={formik.values.status}
                     change={formik.handleChange}
                     render={() => {
                        return (
                           <>
                              <Option v='active' t='Active' />
                              <Option v='suspend' t='Suspend' />
                              <Option v='blocked' t='Blocked' />
                           </>
                        );
                     }}
                  />
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

export default UpdateCustomer;
