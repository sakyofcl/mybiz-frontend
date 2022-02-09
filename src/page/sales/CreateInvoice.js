import { useState } from 'react';
import PopUp from '../../components/Popup';
import { ActionButton } from '../../components/ActionButton';
import { Row, Col } from 'react-bootstrap';
import Alert from '../../components/Alert';
import { FormItem, Text } from '../../components/CustomFormItem';
function CreateInvoice(props) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <ActionButton text='CREATE INVOICE' click={handleShow} />
         <PopUp show={show} close={handleClose} title='CREATE INVOICE'>
            <Row className='w-100 h-100 m-0'>
               <Col md={12}>
                  <Alert msg='Successfully invoice created.' status='1' show={true} />
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

               <Col>
                  <div className='w-100 d-flex justify-content-between'>
                     <button className='btn btn-primary'>
                        <span style={{ marginLeft: 5 }}>New</span>
                     </button>
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

export default CreateInvoice;
