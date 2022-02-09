import { useSelector, useDispatch } from 'react-redux';
import PopUp from '../../components/Popup';
import { popupkey } from '../../constant/popupkey';
import { hidePopup } from '../../redux/action/popup';

//component
import { DeleteConformation } from '../../components/DeleteConformation';

function DeleteCategory(props) {
   const state = useSelector((state) => state.popup);
   const dispatch = useDispatch();

   return (
      <PopUp show={state.display[popupkey.D_CATEGORY]} close={(e) => hidePopup(dispatch, popupkey.D_CATEGORY)} title='DELETE CATEGORY #102'>
         <div className='w-100 h-100'>
            <DeleteConformation label='Ender category id' cancel={(e) => hidePopup(dispatch, popupkey.D_CATEGORY)} />
         </div>
      </PopUp>
   );
}

export default DeleteCategory;
