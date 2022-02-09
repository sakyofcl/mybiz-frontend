import React from 'react';

function ActionButton(props) {
   const { text, click, cls, ico, type } = props;
   return (
      <button className={`btn action-button curve ${cls}`} onClick={click} type={type}>
         {ico ? <ion-icon name={ico}></ion-icon> : ''}
         {text ? <span>{text}</span> : ''}
      </button>
   );
}

ActionButton.defaultProps = {
   click: (e) => {},
   text: '',
   cls: '',
   ico: false,
   type: 'button',
};

export { ActionButton };
