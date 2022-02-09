function PreviewTheme1(props) {
   return (
      <div className='preview-theme-1'>
         <div className='preview-theme-1-head'>
            <span>SANTA PVT LTD</span>
            <span>143 SOUTH CAR STREET</span>
            <span>PHONE : 0770856672</span>
         </div>
         <div className='preview-theme-1-info'>
            <span>INVOICE NO : 102</span>
            <span>DATE : 17/01/2021</span>
         </div>
         <div className='preview-theme-1-body'>
            <table>
               <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Amount</th>
               </tr>
               <tr>
                  <td>Kespersky 1user</td>
                  <td>5</td>
                  <td>1,500.00</td>
                  <td>1,500.00</td>
               </tr>
               <tr>
                  <td>Kespersky 1user</td>
                  <td>3</td>
                  <td>1,500.00</td>
                  <td>1,500.00</td>
               </tr>
               <tr>
                  <td>Kespersky 1user</td>
                  <td>1</td>
                  <td>1,500.00</td>
                  <td>1,500.00</td>
               </tr>
               <tr>
                  <td>Kespersky 1user</td>
                  <td>7</td>
                  <td>1,500.00</td>
                  <td>1,500.00</td>
               </tr>

               <tr>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                  <th>Rs. 1,500.00</th>
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
