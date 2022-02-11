import React from 'react';
import { Table } from 'react-bootstrap';

//Lib
import { DateExtract } from '../../../lib/DateExtract';
import Number from '../../../lib/Number';
import { ChangeState } from '../../../lib/ChangeState';

function PreviewTheme2(props) {
   const { data } = props;
   const date = new DateExtract();

   /*
  const { pos } = useParams();
  const invoice = useSelector((state) => state.invoice);
  const data = invoice.invoiceData.data[pos];

  let tot = 0;
  let subTot = 0;
  let discount = 0;

  let date = new DateExtract();

  let outDate = date.humanReadbleDate(data.invoice_date, "d-M-y", "/");

  tot =
    parseFloat(data.net_amount) +
    parseFloat(data.discount) -
    parseFloat(data.vat_amount);

  tot = tot
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
*/
   return (
      <div className='preview-theme-2'>
         <div className='preview-theme-2-content'>
            <div className='preview-theme-2-header '>
               <img src='https://picsum.photos/200/300' alt='royaltech' />
            </div>

            <div className='left-card w-50'>
               <div className='company-address text-capitalize'>
                  <span>No. 33, Unity Square Sports Complex,</span>
                  <span>Kalmunai. P.O: 32300,</span>
                  <span>077 768 8103,067 226 5650,</span>
                  <span className='text-lowercase'>info@softmagic.lk, www.softmagic.lk.</span>
               </div>

               <div className='company-to'>
                  <div style={{ marginBottom: 0, fontWeight: '500' }}>Invoice To:</div>
                  {<div className='to-item-box'>{`${data.customer_name !== '' && data.customer_name !== null ? data.customer_name + ',' : ''}`}</div>}
                  {<div className='to-item-box'>{`${data.customer_address !== '' && data.customer_address !== null ? data.customer_address + ',' : ''}`}</div>}
                  {<div className='to-item-box'>{`${data.customer_contact !== '' && data.customer_contact !== null ? data.customer_contact + ',' : ''}`}</div>}
               </div>
            </div>

            <div className='right-card'>
               <div className='invoice-badge'>
                  <div className='invoice-badge-box'>
                     <span style={{ marginRight: -4 }}>Invoice</span>
                  </div>
               </div>

               <div className='invoice-date d-flex flex-column align-items-end' style={{ marginBottom: 10 }}>
                  <span className='text-capitalize' style={{ fontWeight: 500 }}>
                     Date
                  </span>
                  <span style={{ fontWeight: 500, fontSize: 17 }}>{date.humanReadbleDate(data.invoice_date, 'd-M-y', '/')}</span>
               </div>

               <div className='invoice-number'>
                  <span className='text-capitalize' style={{ fontWeight: 500 }}>
                     invoice number
                  </span>
                  <span style={{ fontWeight: 500, fontSize: 17 }}>SMK {data.invoice_id}</span>
               </div>
            </div>

            <div className='preview-theme-2-table'>
               <Table bordered>
                  <thead>
                     <tr>
                        <th>NO</th>
                        <th>PRODUCT</th>
                        <th>QTY</th>
                        <th>UNIT RATE</th>
                        <th>LINE TOTAL</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.sale.map((v, i) => {
                        return (
                           <tr>
                              <td className='text-uppercase' style={{ width: '5%' }}>
                                 {++i}
                              </td>
                              <td className='text-uppercase' style={{ width: '42%' }}>
                                 {v.name}
                              </td>
                              <td className='text-uppercase' style={{ width: '8%' }}>
                                 {v.qty}
                              </td>
                              <td className='text-uppercase' style={{ width: '17%' }}>
                                 {Number.thousandSeprater(v.price)}
                              </td>
                              <td style={{ width: '18%' }}>{Number.thousandSeprater(v.sub_total)}</td>
                           </tr>
                        );
                     })}

                     <tr>
                        <td rowSpan={4} colSpan={3}>
                           <div className='w-100 d-flex flex-column'>
                              <div className='w-100 d-flex' style={{ fontSize: 15, fontWeight: 'bold' }}>
                                 Remark
                              </div>
                              <div className='w-100 d-flex' style={{ textAlign: 'start' }}>
                                 <span className='mt-1'>{data.remark1}</span>
                              </div>
                           </div>
                        </td>
                        <td style={{ textAlign: 'end' }}>TOTAL</td>
                        <td>{Number.thousandSeprater((parseFloat(data.total_amount) + parseFloat(data.total_discount)).toFixed(2))}</td>
                     </tr>

                     <tr>
                        <td style={{ textAlign: 'end' }}>DISCOUNT</td>
                        <td>{Number.thousandSeprater(parseFloat(data.total_discount).toFixed(2))}</td>
                     </tr>
                     <tr>
                        <td style={{ textAlign: 'end', fontWeight: 'bold' }}>NET AMOUNT</td>
                        <td>{Number.thousandSeprater(data.total_amount)}</td>
                     </tr>
                  </tbody>
               </Table>
            </div>

            <div className='invoice-message d-flex flex-column w-100'>
               <span style={{ fontWeight: 500, fontSize: 13 }}>
                  Invoiced materials are not subject to refundable.
                  <br />
                  Please bring original invoice along with delivery note for warranty claim.
                  <br />
                  If you have any questions concerning this invoice, kindly contact undersigned.
               </span>
            </div>

            <div className=' d-flex justify-content-center w-100' style={{ fontWeight: 500, fontSize: 13, marginTop: 15 }}>
               <span>Thanks you for your business!</span>
            </div>

            <div className='end-declaration'>
               <div className='company-accountant'>
                  <span className='company-account-signature'>Authorized Signature</span>
               </div>
            </div>
         </div>

         <div className='preview-theme-2-footer  bg-light mt-auto'>
            <span style={{ fontSize: 11 }}>Retail, Wholesale shop for Mobile phone Accessories.</span>
         </div>
      </div>
   );
}

export { PreviewTheme2 };
