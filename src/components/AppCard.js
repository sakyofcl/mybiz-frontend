function AppCard(props) {
   return <div className=' app-card'>{props.children}</div>;
}

function AppCardHead(props) {
   const { title, sub, children } = props;
   return (
      <div className=' app-card-head'>
         <div className='rhead'>
            <span className='rMainTitle uncopy'>{title}</span>
            <span className='rSubTitle uncopy'>{sub}</span>
         </div>
         <div className='lhead'>{children}</div>
      </div>
   );
}

function AppCardFooter(props) {
   return <div className='app-card-footer'>{props.children}</div>;
}
function AppCardBody(props) {
   return <div className='app-card-body'>{props.children}</div>;
}

function PanelCard(props) {
   const { ico, huge, title, fbg, hbg, txt } = props;
   return (
      <div className='panel-card'>
         <div className='panel-card-head' style={{ backgroundColor: hbg }}>
            <div className='row'>
               <div className='col-md-3'>
                  <ion-icon name={ico} style={{ color: txt }}></ion-icon>
               </div>
               <div className='col-md-9 d-flex flex-column align-items-end'>
                  <div className='huge' style={{ color: txt }}>
                     {huge}
                  </div>
                  <div style={{ color: txt }}>{title}</div>
               </div>
            </div>
         </div>
         <div>
            <div className='panel-card-footer' style={{ backgroundColor: fbg }}>
               <span className='footer-text' style={{ color: txt }}>
                  View Details
               </span>
               <ion-icon name='arrow-forward-circle' style={{ color: txt }}></ion-icon>
            </div>
         </div>
      </div>
   );
}

PanelCard.defaultProps = {
   fbg: '#000',
   hbg: '#000',
   txt: '#fff',
};
export { AppCard, AppCardHead, AppCardFooter, AppCardBody, PanelCard };
