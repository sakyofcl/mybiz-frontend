import { useSelector, useDispatch } from 'react-redux';
import PopUp from '../../components/Popup';
import { Row, Col } from 'react-bootstrap';
import Alert from '../../components/Alert';
import { FormItem, Text, Select } from '../../components/CustomFormItem';
import { popupkey } from '../../constant/popupkey';
import { hidePopup } from '../../redux/action/popup';

function UpdateProduct(props) {
   const state = useSelector((state) => state.popup);
   const dispatch = useDispatch();
   return (
      <>
         <PopUp show={state.display[popupkey.U_PRODUCT]} close={(e) => hidePopup(dispatch, popupkey.U_PRODUCT)} title='UPDATE PRODUCT DETAILS'>
            <Row className='w-100 h-100 m-0'>
               <Col md={12}>
                  <Alert msg='Successfully product created.' status='1' show={true} />
               </Col>
               <Col md={6}>
                  <FormItem label='Category'>
                     <Select />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='Sub Category'>
                     <Select />
                  </FormItem>
               </Col>
               <Col md={12}>
                  <FormItem label='Barcode Number'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={12}>
                  <FormItem label='Name 1'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={12}>
                  <FormItem label='Name 2'>
                     <Text />
                  </FormItem>
               </Col>

               <Col md={4}>
                  <FormItem label='Quantity'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Cost Price'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Max Price'>
                     <Text />
                  </FormItem>
               </Col>

               <Col md={4}>
                  <FormItem label='Sell Price'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Cash Price'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={4}>
                  <FormItem label='Special Price'>
                     <Text />
                  </FormItem>
               </Col>

               <Col>
                  <div className='w-100 d-flex justify-content-end'>
                     <button className='btn btn-success'>
                        <span style={{ marginLeft: 5 }}>Save Changes</span>
                     </button>
                  </div>
               </Col>
            </Row>
         </PopUp>
      </>
   );
}

export default UpdateProduct;
