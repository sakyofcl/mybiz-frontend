import React from 'react';
import { Modal } from 'react-bootstrap';
class PopUp extends React.Component {
   render() {
      const { show, close, title, size, center } = this.props;
      return (
         <Modal show={show} size={size} centered={center} scrollable={true} animation contentClassName='custom-popup'>
            <Modal.Header className='custom-popup-header'>
               <div className='head-title'>{title}</div>

               <div className='model-close-btn' onClick={close}>
                  <ion-icon name='close'></ion-icon>
               </div>
            </Modal.Header>
            <Modal.Body>{this.props.children}</Modal.Body>
         </Modal>
      );
   }

   static defaultProps = {
      show: false,
      size: 'lg',
      center: false,
   };
}

export default PopUp;
