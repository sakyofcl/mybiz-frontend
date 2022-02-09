import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import api from '../constant/api';
import type from '../constant/type';

//components
import Alert from '../components/Alert';
class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         login: {
            email: '',
            password: '',
            isLoad: false,
            isWrong: false,
            isWrongMsg: 'unknown error.',
            isWrongCode: '0',
         },
      };

      this.onKeyUpLogin = this.onKeyUpLogin.bind(this);
      this.onSubmitLogin = this.onSubmitLogin.bind(this);
   }

   onSubmitLogin(e) {
      const { login } = this.state;
      let newObj = Object.assign({}, this.state);

      if (login.password && login.email) {
         const data = {
            email: login.email,
            password: login.password,
         };
         newObj.login.isLoad = true;
         this.setState(newObj);

         axios.post(api.authLogin, data).then((res) => {
            let status = res.data.status;
            let msg = res.data.message;

            const { dispatch } = this.props;
            if (status) {
               newObj.login.isLoad = false;
               this.setState(newObj);

               sessionStorage.setItem('auth', true);
               sessionStorage.setItem('token', res.data.data.token);
               sessionStorage.setItem('name', res.data.data.name);

               dispatch({
                  type: type.LOG_IN,
                  payload: {
                     isOk: true,
                     token: res.data.data.token,
                     name: res.data.data.name,
                  },
               });

               window.location.assign('/');
            } else {
               sessionStorage.setItem('auth', false);
               sessionStorage.setItem('token', '');
               newObj.login.isLoad = false;
               newObj.login.isWrong = true;
               newObj.login.isWrongMsg = msg;
               this.setState(newObj);
            }
         });
      } else {
         newObj.login.isLoad = false;
         newObj.login.isWrong = true;
         newObj.login.isWrongMsg = 'Please fill all required fields.';
         this.setState(newObj);
      }
   }

   onKeyUpLogin(e) {
      let val = e.target.value ? e.target.value : false;
      let type = e.target.dataset.name;
      let newObj = Object.assign({}, this.state);

      switch (type) {
         case 'email':
            newObj.login.email = val;
            break;
         case 'password':
            newObj.login.password = val;
            break;
         default:
            break;
      }

      this.setState(newObj);
   }

   render() {
      const { login } = this.state;

      return (
         <div className='vh-100 w-100 d-flex justify-content-center align-items-center app-login'>
            <div className='card' style={{ width: '30%' }}>
               <div className='card-header d-flex justify-content-center align-items-center'>Admin</div>
               <div className='card-body'>
                  <Alert msg={login.isWrongMsg} status={login.isWrongCode} show={login.isWrong} />
                  <div className='mb-3'>
                     <label for='exampleFormControlInput1' className='form-label'>
                        Email
                     </label>
                     <input
                        type='text'
                        className='form-control'
                        data-name='email'
                        onKeyUp={(e) => {
                           this.onKeyUpLogin(e);
                        }}
                     />
                  </div>
                  <div className='mb-3'>
                     <label for='exampleFormControlInput1' className='form-label'>
                        Password
                     </label>
                     <input
                        type='password'
                        className='form-control'
                        data-name='password'
                        onKeyUp={(e) => {
                           this.onKeyUpLogin(e);
                        }}
                     />
                  </div>
               </div>

               <div class='card-footer text-muted d-flex justify-content-center'>
                  <button
                     type='button'
                     className={'btn btn-danger w-100 ' + (login.isLoad ? 'disabled' : '')}
                     onClick={(e) => {
                        this.onSubmitLogin(e);
                     }}
                  >
                     <span className={login.isLoad ? 'd-none' : 'd-block'}>Login</span>
                     <span className={'spinner-border spinner-border-sm ' + (login.isLoad ? '' : 'd-none')}></span>
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      dispatch: dispatch,
   };
};
export default connect(mapDispatchToProps)(Login);
