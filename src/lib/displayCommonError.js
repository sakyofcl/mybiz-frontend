import { showAlert } from '../redux/action/alert';
import { alertkey } from '../constant/alertkey';

function displayCommonError(dispatch, res) {
   if (res.data.status === false) {
      if (res.data.data['errorType'] !== undefined) {
         let errorType = res.data.data.errorType;
         let message = res.data.message;
         let status = 0;
         switch (errorType) {
            case 'token':
               showAlert(dispatch, alertkey.DISPLAY_COMMON_ERROR, { msg: message, status: status });
               break;
            case 'access':
               showAlert(dispatch, alertkey.DISPLAY_COMMON_ERROR, { msg: message, status: status });
               break;
            default:
               break;
         }
      }
   }
}

export { displayCommonError };
