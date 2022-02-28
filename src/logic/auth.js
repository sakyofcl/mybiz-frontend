import axios from '../lib/axios';
import api from '../constant/api';
import type from '../constant/type';

import { showAlert } from '../redux/action/alert';
import { alertkey } from '../constant/alertkey';
import { hideLoader, showLoader } from '../redux/action/loader';
import { loaderkey } from '../constant/loaderkey';

import { storeLogin } from '../redux/action/auth';

function authLogin(dispatch, data = {}, navigate) {
   showLoader(dispatch, loaderkey.AUTH_LOGIN_L);
   axios.post(api.authLogin, data).then((res) => {
      let status = res.data.status ? 1 : 0;
      let msg = res.data.message;

      if (res.data.status) {
         const { token, name } = res.data.data;

         //Auth credentials in client machine.
         localStorage.setItem('auth', true);
         localStorage.setItem('token', token);
         localStorage.setItem('name', name);

         storeLogin(dispatch, {
            isOk: true,
            token: token,
            name: name,
         });

         //Go to home.
         navigate('/');
         window.location.reload();
      } else {
         localStorage.setItem('auth', false);
         localStorage.setItem('token', '');
         localStorage.setItem('name', '');

         showAlert(dispatch, alertkey.AUTH_LOGIN_ALERT, {
            msg: msg,
            status: status,
         });
      }

      hideLoader(dispatch, loaderkey.AUTH_LOGIN_L);
   });
}

export { authLogin };
