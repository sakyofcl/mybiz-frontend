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
import { deleteLocation, readLocation } from '../../logic/location';

function DeleteLocation(props) {
   const { popup, location, loader } = useSelector((state) => state);
   const { pos } = props;
   const deleteData = location.data[pos];
   const dispatch = useDispatch();

   return (
      <PopUp show={popup.display[popupkey.D_LOCATION]} close={(e) => hidePopup(dispatch, popupkey.D_LOCATION)} title={`LOCATION ID : ${popup.display[popupkey.D_LOCATION] ? deleteData.location_id : ''} `} size='sm' center={true}>
         <div className='w-100 h-100 m-0'>
            <DeleteConformation
               label='ENDER LOCATION ID'
               f_error='location id is required.'
               loader={loader.display[loaderkey.D_LOCATION_L]}
               name='location_id'
               cancel={(e) => hidePopup(dispatch, popupkey.D_LOCATION)}
               del={(data, form) => {
                  //START LOADER
                  showLoader(dispatch, loaderkey.D_LOCATION_L);

                  deleteLocation(dispatch, data, (res) => {
                     if (res.data.status) {
                        //STOP LOADER
                        hideLoader(dispatch, loaderkey.D_LOCATION_L);
                        //FETCH DATA
                        readLocation(dispatch, false);
                        //RESET FORM
                        form.resetForm();
                        //CLOSE POPUP
                        hidePopup(dispatch, popupkey.D_LOCATION);
                     }
                  });
               }}
               msg={`NAME : ${popup.display[popupkey.D_LOCATION] ? deleteData.name : ''} `}
            />
         </div>
      </PopUp>
   );
}

export default DeleteLocation;
