import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//component
import { DeleteConformation } from '../../components/DeleteConformation';
import PopUp from '../../components/Popup';

//constant
import { loaderkey } from '../../constant/loaderkey';
import { popupkey } from '../../constant/popupkey';
//action
import { hideLoader, showLoader } from '../../redux/action/loader';
import { hidePopup } from '../../redux/action/popup';
//logic
import { deleteCustomer, readCustomer } from '../../logic/customer';
function DeleteCustomer(props) {
   const { popup, customer, loader } = useSelector((state) => state);
   const { pos } = props;
   const deleteData = customer.data[pos];
   const dispatch = useDispatch();

   return (
      <PopUp show={popup.display[popupkey.D_CUSTOMER]} close={(e) => hidePopup(dispatch, popupkey.D_CUSTOMER)} title={`CUSTOMER ID : ${popup.display[popupkey.D_CUSTOMER] ? deleteData.cid : ''} `} size='sm' center={true}>
         <div className='w-100 h-100 m-0'>
            <DeleteConformation
               label='ENDER CUSTOMER ID'
               f_error='Customer id is required.'
               loader={loader.display[loaderkey.D_CUSTOMER_L]}
               name='customer_id'
               cancel={(e) => hidePopup(dispatch, popupkey.D_CUSTOMER)}
               del={(data, form) => {
                  //START LOADER
                  showLoader(dispatch, loaderkey.D_CUSTOMER_L);

                  deleteCustomer(dispatch, data, (res) => {
                     if (res.data.status) {
                        //STOP LOADER
                        hideLoader(dispatch, loaderkey.D_CUSTOMER_L);
                        //FETCH DATA
                        readCustomer(dispatch, false);
                        //RESET FORM
                        form.resetForm();
                        //CLOSE POPUP
                        hidePopup(dispatch, popupkey.D_CUSTOMER);
                     }
                  });
               }}
               msg={`NAME : ${popup.display[popupkey.D_CUSTOMER] ? deleteData.name : ''} `}
            />
         </div>
      </PopUp>
   );
}

export default DeleteCustomer;
