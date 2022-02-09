import { useState } from 'react';
import PopUp from '../../components/Popup';
import { Row, Col } from 'react-bootstrap';
import Alert from '../../components/Alert';

import { popupkey } from '../../constant/popupkey';
import { hidePopup } from '../../redux/action/popup';
//component
import { DeleteConformation } from '../../components/DeleteConformation';

function DeleteCustomer(props) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <button type='button' class='btn' onClick={handleShow}>
            <ion-icon name='trash-outline'></ion-icon>
         </button>

         <PopUp show={show} close={handleClose} title='DELETE CUSTOMER #102' size='md' center={true}>
            <div className='w-100 h-100 m-0'>
               <DeleteConformation label='Ender customer id' />
            </div>
         </PopUp>
      </>
   );
}

export default DeleteCustomer;
