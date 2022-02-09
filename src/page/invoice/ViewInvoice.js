import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactToPrint from 'react-to-print';
//components
import PopUp from '../../components/Popup';
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import AppButton from '../../components/AppButton';
import { PreviewTheme1 } from './preview/PreviewTheme1';
//constant
import { popupkey } from '../../constant/popupkey';
//action
import { hidePopup } from '../../redux/action/popup';
//Lib
import { DateExtract } from '../../lib/DateExtract';
import Number from '../../lib/Number';
function ViewInvoice(props) {
   const dispatch = useDispatch();
   const { popup, invoice } = useSelector((state) => state);
   const { pos } = props;
   const invoiceData = invoice.data[pos];
   const date = new DateExtract();
   let isShowPopup = popup.display[popupkey.V_INVOICE_INFO];
   const componentRef = useRef();
   return (
      <PopUp
         show={popup.display[popupkey.V_INVOICE_INFO]}
         close={(e) => {
            hidePopup(dispatch, popupkey.V_INVOICE_INFO);
         }}
         title='VIEW INVOICE'
      >
         {isShowPopup ? (
            <div className='invoice-info-wrapper'>
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

                  <div className='w-100 d-flex justify-content-end mt-2' id='printarea'>
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

                  <div className='w-100 d-flex flex-column mt-2'>
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

               <div className='invoice-info-footer'>
                  <div className='w-50 d-flex align-items-center'>
                     <AppButton text='PREVIEW' cls='btn-danger m-1' ico='eye-outline' h={40} />
                     <AppButton text='PRINT' cls='btn-danger m-1' ico='print-outline' h={40} />
                  </div>
               </div>
            </div>
         ) : (
            ''
         )}

         {/*
               <div className='d-flex flex-column align-items-center'>
            <div className='h-100 w-100' ref={componentRef}>
               <PreviewTheme1 />
            </div>
            <ReactToPrint trigger={() => <button>Print this out!</button>} content={() => componentRef.current} bodyClass='bg-danger' />

            
         </div>
               */}
      </PopUp>
   );
}

export { ViewInvoice };
