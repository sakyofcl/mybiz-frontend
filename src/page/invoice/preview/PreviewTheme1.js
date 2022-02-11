//Lib
import { DateExtract } from '../../../lib/DateExtract';
import Number from '../../../lib/Number';

function PreviewTheme1(props) {
   const { data } = props;
   const date = new DateExtract();
   return (
      <div className='preview-theme-1'>
         <div className='preview-theme-1-head'>
            <span>Soft Magic Kalmunai</span>
            <span>No. 33, Unity Square Sports Complex</span>
            <span>PHONE : 077 768 8103</span>
         </div>
         <div className='preview-theme-1-info'>
            <span>INVOICE NO : {data.invoice_id}</span>
            <span>DATE : {date.humanReadbleDate(data.invoice_date, 'd-M-y', '/')}</span>
         </div>
         <div className='preview-theme-1-body'>
            <table>
               <tr>
                  <th>No</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Amount</th>
               </tr>
               {data.sale.map((v, i) => {
                  return (
                     <tr>
                        <td>{++i}</td>
                        <td>{v.name}</td>
                        <td> {v.qty}</td>
                        <td> {Number.thousandSeprater(v.price)}</td>
                        <td>{Number.thousandSeprater(v.sub_total)}</td>
                     </tr>
                  );
               })}

               <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className='text-end'>Total</th>
                  <th>Rs. {Number.thousandSeprater((parseFloat(data.total_amount) + parseFloat(data.total_discount)).toFixed(2))}</th>
               </tr>
               <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className='text-end'>Paid</th>
                  <th>Rs. {Number.thousandSeprater(parseFloat(data.paid).toFixed(2))}</th>
               </tr>
               <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className='text-end'>Balance</th>
                  <th>Rs. {Number.thousandSeprater(parseFloat(data.balance).toFixed(2))}</th>
               </tr>
            </table>
         </div>
         <div className='preview-theme-1-footer'>
            <span>Thank You</span>
         </div>
      </div>
   );
}

export { PreviewTheme1 };
