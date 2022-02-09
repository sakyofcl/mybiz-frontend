function SummaryCard(props) {
   const { bg, tc, ic, ico, value, sym, title } = props;
   return (
      <div className='app-summary-card' style={{ backgroundColor: bg }}>
         <div className='app-summary-icon'>
            <ion-icon name={ico} style={{ color: ic }}></ion-icon>
         </div>
         <div className='app-summary-content'>
            <span className='summary-value' style={{ color: tc }}>
               {sym} {value}
            </span>
            <span className='summary-title' style={{ color: tc }}>
               {title}
            </span>
         </div>
      </div>
   );
}

export default SummaryCard;
