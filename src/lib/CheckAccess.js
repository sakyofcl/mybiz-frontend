//action
import { showPopup } from '../redux/action/popup';
//constant
import { popupkey } from '../constant/popupkey';

function checkAccess(dispatch, data, module, permission, ok = () => {}, wrong = () => {}) {
   let state = false;

   if (data.dataFetched === true) {
      for (let i = 0; i < data.data.length; i++) {
         if (data.data[i].module_id === module) {
            if (data.data[i].access[permission] === 0) {
               state = false;
               break;
            } else if (data.data[i].access[permission] === 1) {
               state = true;
               break;
            }
         } else {
            state = false;
         }
      }

      if (state) {
         ok();
      } else {
         wrong();
      }
   }
}

export { checkAccess };
