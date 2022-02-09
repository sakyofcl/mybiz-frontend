import React from 'react';

function Alert(props) {
   const {
      close,
      state: { msg, status, show },
   } = props;

   if (show) {
      return (
         <div className={`alert app-alert ${status === 1 ? 'ok' : 'error'} `}>
            <span>{msg}</span>

            <button className={` btn alert-close-btn ${status === 1 ? 'btn-success' : 'btn-danger'} `} onClick={close}>
               <ion-icon name='close'></ion-icon>
            </button>
         </div>
      );
   } else {
      return <span></span>;
   }
}
Alert.defaultProps = {
   close: (e) => {},
};

export default Alert;
