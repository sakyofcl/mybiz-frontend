import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import PopUp from './Popup';
//constant
import { popupkey } from '../constant/popupkey';
//action
import { hidePopup } from '../redux/action/popup';

function AccessDenied(props) {
   const { popup } = useSelector((state) => state);
   const { displayKey } = props;
   const dispatch = useDispatch();
   return (
      <PopUp
         show={popup.display[displayKey]}
         close={(e) => {
            hidePopup(dispatch, displayKey);
         }}
         title='Warning '
         size='sm'
         center={false}
      >
         <div className='access-denied-box'>
            <ion-icon name='close-circle'></ion-icon>
            <span>Access denied</span>
         </div>
      </PopUp>
   );
}

export default AccessDenied;
