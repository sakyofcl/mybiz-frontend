import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
//components
import PopUp from '../../components/Popup';
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import AppButton from '../../components/AppButton';

//Page
import { PreviewTheme2 } from './preview/PreviewTheme2';
import { PreviewTheme1 } from './preview/PreviewTheme1';

//constant
import { popupkey } from '../../constant/popupkey';
//action
import { hidePopup } from '../../redux/action/popup';
//Lib
import { DateExtract } from '../../lib/DateExtract';
import Number from '../../lib/Number';
import { ChangeState } from '../../lib/ChangeState';
function ViewInvoice(props) {
   const dispatch = useDispatch();
   const { popup, invoice } = useSelector((state) => state);
   const [state, setState] = useState({ preview: false });
   const { pos } = props;
   const invoiceData = invoice.data[pos];
   const date = new DateExtract();
   //let isShowPopup = popup.display[popupkey.V_INVOICE_INFO];
   const previewTheme2 = useRef();
   const previewTheme1 = useRef();

   const handlePrintPreviewTheme2 = useReactToPrint({
      content: () => previewTheme2.current,
   });
   const handlePrintPreviewTheme1 = useReactToPrint({
      content: () => previewTheme1.current,
   });
   return (
      <PopUp
         show={popup.display[popupkey.V_INVOICE_INFO]}
         close={(e) => {
            hidePopup(dispatch, popupkey.V_INVOICE_INFO);
         }}
         title='VIEW INVOICE'
      >
         <div className={`invoice-info-wrapper ${state.preview ? 'd-none' : ''}`}>
            <div className='invoice-info-footer'>
               <div className='w-50 d-flex align-items-center'>
                  <AppButton
                     text='PREVIEW'
                     cls='btn-danger m-1'
                     ico='eye-outline'
                     h={40}
                     click={(e) => {
                        setState(ChangeState(state, { preview: true }));
                     }}
                  />
                  <AppButton text='PRINT' cls='btn-danger m-1' ico='print-outline' h={40} click={handlePrintPreviewTheme1} />
               </div>
            </div>

            <div className='invoice-info-head'>
               <div className='invoice-cutomer-info'>
                  <div className='invoice-cutomer-info-item'>{invoiceData.customer_name ? invoiceData.customer_name : 'unknown'}</div>
                  <div className='invoice-cutomer-info-item'>{invoiceData.customer_address ? invoiceData.customer_address : 'unknown'}</div>
                  <div className='invoice-cutomer-info-item'>{invoiceData.customer_contact ? invoiceData.customer_contact : 'unknown'}</div>
               </div>
               <div className='invoice-info-date-id'>
                  <div className='invoice-info-date-id-item'>{date.humanReadbleDate(invoiceData.invoice_date, 'd-M-y', '/')}</div>
                  <div className='invoice-info-date-id-item'>#{invoiceData.invoice_id}</div>
               </div>
            </div>

            <div className='invoice-info-body'>
               <Table>
                  <TableHead head='Name,Quantity,Price,Discount,Amount' />
                  <TableBody>
                     {invoiceData.sale.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>{v.name}</TableData>
                              <TableData>{v.qty}</TableData>
                              <TableData>{Number.thousandSeprater(v.price)}</TableData>
                              <TableData>{Number.thousandSeprater(v.discount)}</TableData>
                              <TableData>{Number.thousandSeprater(v.sub_total)}</TableData>
                           </TableRaw>
                        );
                     })}
                  </TableBody>
               </Table>

               <div className='d-flex justify-content-between'>
                  <div className='w-50 d-flex flex-column mt-2'>
                     <div className='invoice-auther-info justify-content-start'>
                        <span>Created by : </span>
                        <span>{invoiceData.user_name}</span>
                     </div>
                     <div className='invoice-auther-info justify-content-start'>
                        <span>Sales ref : </span>
                        <span>{invoiceData.sales_ref}</span>
                     </div>
                     <div className='invoice-auther-info justify-content-start'>
                        <span>Remark 1 : </span>
                        <span>{invoiceData.remark1}</span>
                     </div>
                     <div className='invoice-auther-info justify-content-start'>
                        <span>Remark 2 : </span>
                        <span>{invoiceData.remark2}</span>
                     </div>
                  </div>
                  <div className='w-50 d-flex justify-content-end mt-2' id='printarea'>
                     <div className='d-flex flex-column'>
                        <div className='invoice-item-amount'>
                           <span>TOTAL</span>
                           <span>{Number.thousandSeprater((parseFloat(invoiceData.total_amount) + parseFloat(invoiceData.total_discount)).toFixed(2))}</span>
                        </div>

                        <div className='invoice-item-amount'>
                           <span>DISCOUNT</span>
                           <span>{Number.thousandSeprater(parseFloat(invoiceData.total_discount).toFixed(2))}</span>
                        </div>
                        <div className='invoice-item-amount'>
                           <span>NET AMOUNT</span>
                           <span>{Number.thousandSeprater(invoiceData.total_amount)}</span>
                        </div>
                        <div className='invoice-item-amount'>
                           <span>PAID</span>
                           <span>{Number.thousandSeprater(parseFloat(invoiceData.paid).toFixed(2))}</span>
                        </div>
                        <div className='invoice-item-amount'>
                           <span>BALANCE</span>
                           <span>{Number.thousandSeprater(parseFloat(invoiceData.balance).toFixed(2))}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className='mt-3'>
               <Table>
                  <TableHead head='Amount,Date,Method,Reference' />
                  <TableBody>
                     {invoiceData.payment.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>{Number.thousandSeprater(v.amount)}</TableData>
                              <TableData>{v.method}</TableData>
                              <TableData>{date.humanReadbleDate(v.date, 'd-M-y', '/')}</TableData>
                              <TableData>{v.refrence ? v.refrence : 'Nothing'}</TableData>
                           </TableRaw>
                        );
                     })}
                  </TableBody>
               </Table>
            </div>
            <div className='d-none'>
               <div className='h-100 w-100' ref={previewTheme1}>
                  <PreviewTheme1 data={invoiceData} />
               </div>
            </div>
         </div>

         <div className={`flex-column align-items-center ${state.preview ? 'd-flex' : 'd-none'}`}>
            <div className='d-flex justify-content-between w-100 mb-3'>
               <AppButton text='PRINT' cls='btn-danger' ico='print-outline' h={40} click={handlePrintPreviewTheme2} />
               <AppButton
                  text='CLOSE'
                  cls='btn-danger'
                  ico='close'
                  h={40}
                  click={(e) => {
                     setState(ChangeState(state, { preview: false }));
                  }}
               />
            </div>

            <div className='h-100 w-100 ' ref={previewTheme2}>
               <PreviewTheme2 data={invoiceData} />
            </div>
         </div>
      </PopUp>
   );
}

export { ViewInvoice };
