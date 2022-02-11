import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import { Filter, FilterItem } from '../../components/Filter';
import { ActionButton } from '../../components/ActionButton';
import Badge from '../../components/Badge';
import { ViewPayment } from './ViewPayment';
import { ViewInvoice } from './ViewInvoice';
import { PaymentWindow } from './PaymentWindow';
import AppButton from '../../components/AppButton';
import { AppPagination } from '../../components/AppPagination';

//action
import { showPopup } from '../../redux/action/popup';
//constant
import { popupkey } from '../../constant/popupkey';
//Logic
import { readInvoice } from '../../logic/invoice';
import { Head } from '../../logic/Head';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import { DateExtract } from '../../lib/DateExtract';
import Number from '../../lib/Number';

function Invoice(props) {
   Head.setTitle('Invoices | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const [state, setState] = useState({ viewInvoicePos: 0, param: '', addPaymentPos: 0 });
   const { invoice, popup } = useSelector((state) => state);
   const date = new DateExtract();

   useEffect(() => {
      readInvoice(dispatch, invoice.fetchData);
   }, []);
   const formik = useFormik({
      initialValues: {
         id: '',
         status: '',
         min: '',
         max: '',
         from: '',
         to: '',
         min_max_by: '',
         from_to_by: '',
      },
      validationSchema: yup.object({
         id: yup.number(),
         status: yup.number(),
         min: yup.number(),
         max: yup.number(),
      }),
      onSubmit: (formData) => {
         let param = '';
         Object.keys(formData).map((key) => {
            if (formData[key] !== '') {
               param += key + '=' + formData[key] + '&';
            }
         });
         if (param !== '') {
            readInvoice(dispatch, false, invoice.currentPage, param);
         }
         setState(
            ChangeState(state, {
               param: param,
            })
         );
      },
   });

   return (
      <div className='app-content'>
         <AppCard>
            <AppCardHead title='All Invoices' sub='Total : 1020'>
               <Link to='/invoice/create'>
                  <ActionButton text='CREATE INVOICE' cls='btn-danger' />
               </Link>
            </AppCardHead>

            <AppCardBody>
               <form onSubmit={formik.handleSubmit} autoComplete='off'>
                  <Filter
                     reset={(e) => {
                        formik.resetForm();
                        readInvoice(dispatch, false, 1, '');
                        setState(
                           ChangeState(state, {
                              param: '',
                           })
                        );
                     }}
                  >
                     <FilterItem type='text' label='Invoice no' name='id' value={formik.values.id} change={formik.handleChange} />
                     <FilterItem
                        type='select'
                        label='Status'
                        change={formik.handleChange}
                        value={formik.values.status}
                        name='status'
                        render={() => {
                           return (
                              <>
                                 <option value='0'>Pending</option>
                                 <option value='1'>Complete</option>
                              </>
                           );
                        }}
                     />
                     <FilterItem
                        type='select'
                        label='This'
                        change={formik.handleChange}
                        value={formik.values.from_to_by}
                        name='from_to_by'
                        render={() => {
                           return (
                              <>
                                 <option value='day'>Day</option>
                                 <option value='month'>Month</option>
                                 <option value='year'>Year</option>
                              </>
                           );
                        }}
                     />
                     <FilterItem type='date' label='From' name='from' value={formik.values.from} change={formik.handleChange} />
                     <FilterItem type='date' label='To' name='to' value={formik.values.to} change={formik.handleChange} />

                     <FilterItem type='text' label='Min' name='min' value={formik.values.min} change={formik.handleChange} />
                     <FilterItem type='text' label='Max' name='max' value={formik.values.max} change={formik.handleChange} />
                     <FilterItem
                        type='select'
                        label='In'
                        change={formik.handleChange}
                        value={formik.values.min_max_by}
                        name='min_max_by'
                        render={() => {
                           return (
                              <>
                                 <option value='total'>Total</option>
                                 <option value='balance'>Balance</option>
                              </>
                           );
                        }}
                     />
                  </Filter>
               </form>
               <Table>
                  <TableHead head='Invoice No,Payment,Total,Paid,Balance,Invoice Date,Customer,Action' />
                  <TableBody>
                     {invoice.data.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>IN{v.invoice_id}</TableData>
                              <TableData>{v.payment_status === 1 ? <Badge title='Complete' cls='bg-success' /> : <Badge title='Pending' cls='bg-danger' />}</TableData>
                              <TableData>Rs {Number.thousandSeprater(parseFloat(v.total_amount).toFixed(2))}</TableData>
                              <TableData>Rs {Number.thousandSeprater(parseFloat(v.paid).toFixed(2))}</TableData>
                              <TableData>Rs {Number.thousandSeprater(parseFloat(v.balance).toFixed(2))}</TableData>
                              <TableData>{date.humanReadbleDate(v.invoice_date, 'd-M-y', '/')}</TableData>
                              <TableData>{v.customer_name}</TableData>
                              <TableData>
                                 <TableActionWrapper>
                                    <TableActionBtn
                                       ico='cash-outline'
                                       click={(e) => {
                                          showPopup(dispatch, popupkey.PAYMENT_WINDOW);
                                          setState(
                                             ChangeState(state, {
                                                addPaymentPos: i,
                                             })
                                          );
                                       }}
                                    />
                                    <TableActionBtn
                                       ico='ellipsis-vertical'
                                       click={(e) => {
                                          setState(
                                             ChangeState(state, {
                                                viewInvoicePos: i,
                                             })
                                          );
                                          showPopup(dispatch, popupkey.V_INVOICE_INFO);
                                       }}
                                    />
                                 </TableActionWrapper>
                              </TableData>
                           </TableRaw>
                        );
                     })}
                     {/* DISPLAY SUMMARY DETAILS */}
                     <TableRaw cls='table-summary-row'></TableRaw>
                     <TableRaw>
                        <TableData>{Number.thousandSeprater(parseInt(invoice.dataSummary.total_invoice ? invoice.dataSummary.total_invoice : 0))}</TableData>
                        <TableData></TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(invoice.dataSummary.total_amount ? invoice.dataSummary.total_amount : 0).toFixed(2))}</TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(invoice.dataSummary.total_paid ? invoice.dataSummary.total_paid : 0).toFixed(2))}</TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(invoice.dataSummary.total_balance ? invoice.dataSummary.total_balance : 0).toFixed(2))}</TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                     </TableRaw>
                     {/* END SUMMARY DETAILS */}
                  </TableBody>
               </Table>
            </AppCardBody>
            <AppCardFooter>
               <AppPagination
                  tot={invoice.totData}
                  per={invoice.perPage}
                  active={invoice.currentPage}
                  change={(page) => {
                     readInvoice(dispatch, false, page, state.param);
                  }}
               />
            </AppCardFooter>

            {/*=============== [ POPUP ] ================*/}
            {popup.display[popupkey.V_INVOICE_INFO] ? <ViewInvoice pos={state.viewInvoicePos} /> : ''}
            <ViewPayment />
            {popup.display[popupkey.PAYMENT_WINDOW] ? <PaymentWindow pos={state.addPaymentPos} /> : ''}
         </AppCard>
      </div>
   );
}

export default Invoice;
