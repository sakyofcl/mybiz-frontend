function AppButton(props) {
   const { cls, ico, text, load, click, w, h, type } = props;
   return (
      <button type={type} className={`btn app-button curve uncopy ${cls}`} disabled={load} onClick={click} style={{ height: h, width: w }}>
         {load ? (
            <span class='spinner-border spinner-border-sm app-spinner uncopy' role='status'></span>
         ) : (
            <>
               {ico ? <ion-icon name={ico}></ion-icon> : ''}
               {text ? <span className='app-btn-text uncopy'>{text}</span> : ''}
            </>
         )}
      </button>
   );
}
AppButton.defaultProps = {
   load: false,
   click: (e) => {},
   h: 'auto',
   w: 'auto',
   type: 'button',
};
export default AppButton;
