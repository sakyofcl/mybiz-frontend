import { useState } from 'react';
import PopUp from '../../components/Popup';
import { Row, Col } from 'react-bootstrap';
import Alert from '../../components/Alert';
import { FormItem, Text, Select } from '../../components/CustomFormItem';
function UpdateCustomer(props) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <button type='button' class='btn' onClick={handleShow}>
            <ion-icon name='create-outline'></ion-icon>
         </button>
         <PopUp show={show} close={handleClose} title='UPDATE CUSTOMER'>
            <Row className='w-100 h-100 m-0'>
               <Col md={12}>
                  <Alert msg='Successfully update customer.' status='1' show={true} />
               </Col>
               <Col md={12}>
                  <FormItem label='Name'>
                     <Text />
                  </FormItem>
               </Col>

               <Col md={6}>
                  <FormItem label='Contact'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='Email'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='Address'>
                     <Text />
                  </FormItem>
               </Col>

               <Col md={6}>
                  <FormItem label='City'>
                     <Text />
                  </FormItem>
               </Col>

               <Col md={6}>
                  <FormItem label='Reg No'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='Type'>
                     <Select />
                  </FormItem>
               </Col>

               <Col md={6}>
                  <FormItem label='CP1 Num'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='CP1 Name'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='CP2 Num'>
                     <Text />
                  </FormItem>
               </Col>
               <Col md={6}>
                  <FormItem label='CP2 Name'>
                     <Text />
                  </FormItem>
               </Col>

               <Col>
                  <div className='w-100 d-flex justify-content-end'>
                     <button className='btn btn-success'>
                        <span style={{ marginLeft: 5 }}>Save</span>
                     </button>
                  </div>
               </Col>
            </Row>
         </PopUp>
      </>
   );
}

export default UpdateCustomer;
