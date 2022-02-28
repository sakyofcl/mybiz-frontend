import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import Alert from './Alert';
//constant
import { alertkey } from '../constant/alertkey';
//action
import { hideAlert } from '../redux/action/alert';

function DisplayCommonError(props) {
   const { alert } = useSelector((state) => state);
   const dispatch = useDispatch();
   return (
      <div className='col-12'>
         <Alert
            state={alert.display[alertkey.DISPLAY_COMMON_ERROR]}
            close={(e) => {
               hideAlert(dispatch, alertkey.DISPLAY_COMMON_ERROR);
            }}
         />
      </div>
   );
}

export default DisplayCommonError;
