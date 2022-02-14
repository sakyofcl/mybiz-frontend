import { useSelector, useDispatch } from 'react-redux';
//component
import { DeleteConformation } from '../../components/DeleteConformation';
import PopUp from '../../components/Popup';
//logic
import { deleteSubCategory, getCategoryGroup } from '../../logic/category';
//constant
import { loaderkey } from '../../constant/loaderkey';
import { popupkey } from '../../constant/popupkey';
//action
import { hidePopup } from '../../redux/action/popup';
import { hideLoader, showLoader } from '../../redux/action/loader';

function DeleteSubCategory(props) {
   const { popup, category, loader } = useSelector((state) => state);
   const { pos, mainPos } = props;
   const deleteData = popup.display[popupkey.D_SUBCATEGORY] ? category.data[mainPos]['subCategory'][pos] : '';
   const dispatch = useDispatch();

   return (
      <PopUp show={popup.display[popupkey.D_SUBCATEGORY]} close={(e) => hidePopup(dispatch, popupkey.D_SUBCATEGORY)} title={`SUB CATEGORY ID : ${popup.display[popupkey.D_SUBCATEGORY] ? deleteData.subcat_id : ''} `} size='sm' center={true}>
         <div className='w-100 h-100'>
            <DeleteConformation
               label='ENDER SUB CATEGORY ID'
               f_error='SubCategory id is required.'
               loader={loader.display[loaderkey.D_SUBCATEGORY_L]}
               name='subcat_id'
               cancel={(e) => hidePopup(dispatch, popupkey.D_SUBCATEGORY)}
               del={(data, form) => {
                  //START LOADER
                  showLoader(dispatch, loaderkey.D_SUBCATEGORY_L);

                  deleteSubCategory(dispatch, data, (res) => {
                     if (res.data.status) {
                        //STOP LOADER
                        hideLoader(dispatch, loaderkey.D_SUBCATEGORY_L);
                        //FETCH DATA
                        getCategoryGroup(dispatch, false);
                        //RESET FORM
                        form.resetForm();
                        //CLOSE POPUP
                        hidePopup(dispatch, popupkey.D_SUBCATEGORY);
                     }
                  });
               }}
               msg={`NAME : ${popup.display[popupkey.D_SUBCATEGORY] ? deleteData.name : ''} `}
            />
         </div>
      </PopUp>
   );
}

export default DeleteSubCategory;
