import axios from '../lib/axios';
import api from '../constant/api';
import { storeReceiverCode } from '../redux/action/receiver';
function fetchReceiverData(dispatch) {
   axios.get(api.readReceiver).then((res) => {
      if (res.data.status) {
         storeReceiverCode(dispatch, res.data.data);
      }
   });
}

export { fetchReceiverData };
