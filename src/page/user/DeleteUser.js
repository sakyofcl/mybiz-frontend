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
import { deleteUser, readUser } from '../../logic/user';

function DeleteUser(props) {
   const { popup, loader, user } = useSelector((state) => state);
   const { pos } = props;
   const deleteData = user.data[pos];
   const dispatch = useDispatch();

   return (
      <PopUp show={popup.display[popupkey.D_USER]} close={(e) => hidePopup(dispatch, popupkey.D_USER)} title={`USER CODE : ${deleteData.user_id}`} size='sm' center={false}>
         <div className='w-100 h-100 m-0'>
            <DeleteConformation
               label='ENDER USER CODE'
               f_error='USER id is required.'
               loader={loader.display[loaderkey.D_USER_L]}
               name='user_id'
               cancel={(e) => hidePopup(dispatch, popupkey.D_USER)}
               del={(data, form) => {
                  //START LOADER
                  showLoader(dispatch, loaderkey.D_USER_L);
                  deleteUser(dispatch, data, (res) => {
                     if (res.data.status) {
                        //STOP LOADER
                        hideLoader(dispatch, loaderkey.D_USER_L);
                        //FETCH DATA
                        readUser(dispatch, false);
                        //RESET FORM
                        form.resetForm();
                        //CLOSE POPUP
                        hidePopup(dispatch, popupkey.D_USER);
                     } else {
                        hideLoader(dispatch, loaderkey.D_USER_L);
                     }
                  });
               }}
               msg={`NAME : ${deleteData.name}`}
            />
         </div>
      </PopUp>
   );
}

export default DeleteUser;
