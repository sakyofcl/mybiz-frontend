import { useSelector, useDispatch } from 'react-redux';

//component
import { DeleteConformation } from '../../components/DeleteConformation';
import PopUp from '../../components/Popup';
//logic
import { deleteCategory, getCategoryGroup } from '../../logic/category';
//constant
import { loaderkey } from '../../constant/loaderkey';
import { popupkey } from '../../constant/popupkey';
//action
import { hidePopup } from '../../redux/action/popup';
import { hideLoader, showLoader } from '../../redux/action/loader';

function DeleteCategory(props) {
   const { popup, loader, category } = useSelector((state) => state);
   const { pos } = props;
   const deleteData = category.data[pos];
   const dispatch = useDispatch();

   return (
      <PopUp show={popup.display[popupkey.D_CATEGORY]} close={(e) => hidePopup(dispatch, popupkey.D_CATEGORY)} title={`CATEGORY ID : ${popup.display[popupkey.D_CATEGORY] ? deleteData.cat_id : ''} `} size='sm' center={true}>
         <div className='w-100 h-100'>
            <DeleteConformation
               label='ENDER CATEGORY ID'
               f_error='Category id is required.'
               loader={loader.display[loaderkey.D_CATEGORY_L]}
               name='cat_id'
               cancel={(e) => hidePopup(dispatch, popupkey.D_CATEGORY)}
               del={(data, form) => {
                  //START LOADER
                  showLoader(dispatch, loaderkey.D_CATEGORY_L);

                  deleteCategory(dispatch, data, (res) => {
                     if (res.data.status) {
                        //STOP LOADER
                        hideLoader(dispatch, loaderkey.D_CATEGORY_L);
                        //FETCH DATA
                        getCategoryGroup(dispatch, false);
                        //RESET FORM
                        form.resetForm();
                        //CLOSE POPUP
                        hidePopup(dispatch, popupkey.D_CATEGORY);
                     }
                  });
               }}
               msg={`NAME : ${popup.display[popupkey.D_CATEGORY] ? deleteData.name : ''} `}
            />
         </div>
      </PopUp>
   );
}

export default DeleteCategory;
