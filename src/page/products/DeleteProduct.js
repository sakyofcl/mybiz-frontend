import { useSelector, useDispatch } from 'react-redux';
import PopUp from '../../components/Popup';

//component
import { DeleteConformation } from '../../components/DeleteConformation';
//logic
import { deleteProduct, fetchProduct, getNextBarcode } from '../../logic/product';
//constant
import { loaderkey } from '../../constant/loaderkey';
import { popupkey } from '../../constant/popupkey';
//action
import { hideLoader, showLoader } from '../../redux/action/loader';
import { hidePopup } from '../../redux/action/popup';

function DeleteProduct(props) {
   const { popup, product, loader } = useSelector((state) => state);
   const { pos } = props;
   const deleteData = product.data[pos];
   const dispatch = useDispatch();

   return (
      <PopUp show={popup.display[popupkey.D_PRODUCT]} close={(e) => hidePopup(dispatch, popupkey.D_PRODUCT)} title={`PRODUCT ID : ${popup.display[popupkey.D_PRODUCT] ? deleteData.pid : ''} `} size='md' center={true}>
         <div className='w-100 h-100 m-0'>
            <DeleteConformation
               label='ENDER PRODUCT ID'
               cancel={(e) => hidePopup(dispatch, popupkey.D_PRODUCT)}
               f_error='Product id is required.'
               loader={loader.display[loaderkey.D_PRODUCT_L]}
               name='pid'
               del={(data, form) => {
                  //START LOADER
                  showLoader(dispatch, loaderkey.D_PRODUCT_L);

                  deleteProduct(dispatch, data, (res) => {
                     if (res.data.status) {
                        //STOP LOADER
                        hideLoader(dispatch, loaderkey.D_PRODUCT_L);
                        //FETCH DATA
                        fetchProduct(dispatch);
                        getNextBarcode(dispatch);
                        //RESET FORM
                        form.resetForm();
                        //CLOSE POPUP
                        hidePopup(dispatch, popupkey.D_PRODUCT);
                     }
                  });
               }}
               msg={`ITEM NAME : ${popup.display[popupkey.D_PRODUCT] ? deleteData.name1 : ''} `}
            />
         </div>
      </PopUp>
   );
}

export default DeleteProduct;
