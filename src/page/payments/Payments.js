import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import Badge from '../../components/Badge';
import { Filter, FilterItem } from '../../components/Filter';
import { AppPagination } from '../../components/AppPagination';
//logic
import { readPayments } from '../../logic/payment';
import { Head } from '../../logic/Head';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import Number from '../../lib/Number';
function Payments(props) {
   Head.setTitle('Payments | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { payment } = useSelector((state) => state);
   const [state, setState] = useState({ param: '' });
   useEffect(() => {
      readPayments(dispatch, payment.fetchData);
   }, []);
   const formik = useFormik({
      initialValues: {
         payment_id: '',
         method: '',
         refrence: '',
         from_to_by: '',
         amount: '',
         invoice_id: '',
         from: '',
         to: '',
         min_max_by: '',
         min: '',
         max: '',
      },
      validationSchema: yup.object({
         payment_id: yup.number(),
         invoice_id: yup.number(),
         amount: yup.number(),
      }),
      onSubmit: (formData) => {
         let param = '';
         Object.keys(formData).map((key) => {
            if (formData[key] !== '') {
               param += key + '=' + formData[key] + '&';
            }
         });
         if (param !== '') {
            readPayments(dispatch, false, payment.currentPage, param);
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
            <AppCardHead title='All Payments History' sub='Total : 1520' />

            <AppCardBody>
               <form onSubmit={formik.handleSubmit} autoComplete='off'>
                  <Filter
                     reset={(e) => {
                        formik.resetForm();
                        readPayments(dispatch, false, 1, '');
                        setState(
                           ChangeState(state, {
                              param: '',
                           })
                        );
                     }}
                  >
                     <FilterItem type='text' label='Payment No' name='payment_id' value={formik.values.payment_id} change={formik.handleChange} />
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
                                 <option value='amount'>Amount</option>
                              </>
                           );
                        }}
                     />

                     <FilterItem type='text' label='Invoice No' name='invoice_id' value={formik.values.invoice_id} change={formik.handleChange} />
                     <FilterItem
                        type='select'
                        label='Method'
                        change={formik.handleChange}
                        value={formik.values.method}
                        name='method'
                        render={() => {
                           return (
                              <>
                                 <option value='card'>Card</option>
                                 <option value='cash'>Cash</option>
                                 <option value='cheque'>Cheque</option>
                              </>
                           );
                        }}
                     />
                     <FilterItem type='text' label='Reference' name='refrence' value={formik.values.refrence} change={formik.handleChange} />
                  </Filter>
               </form>
               <Table>
                  <TableHead head='Payment No,date,amount,invoice no,customer,method,reference,update,action' />
                  <TableBody>
                     {payment.data.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>{v.payment_id}</TableData>
                              <TableData>{v.date}</TableData>
                              <TableData>{v.amount}</TableData>
                              <TableData>{v.invoice_id}</TableData>
                              <TableData>{v.customer_name}</TableData>
                              <TableData>{v.method}</TableData>
                              <TableData>{v.refrence}</TableData>
                              <TableData>{v.update_at}</TableData>
                              <TableData>
                                 <TableActionWrapper>
                                    <TableActionBtn ico='document-attach-outline' />
                                 </TableActionWrapper>
                              </TableData>
                           </TableRaw>
                        );
                     })}

                     {/* DISPLAY SUMMARY DETAILS */}
                     <TableRaw cls='table-summary-row'></TableRaw>
                     <TableRaw>
                        <TableData>{Number.thousandSeprater(parseInt(payment.dataSummary.total_payment ? payment.dataSummary.total_payment : 0))}</TableData>
                        <TableData></TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(payment.dataSummary.total_amount ? payment.dataSummary.total_amount : 0).toFixed(2))}</TableData>
                        <TableData>{Number.thousandSeprater(parseInt(payment.dataSummary.total_invoice ? payment.dataSummary.total_invoice : 0))}</TableData>
                        <TableData>{Number.thousandSeprater(parseInt(payment.dataSummary.total_customer ? payment.dataSummary.total_customer : 0))}</TableData>
                        <TableData></TableData>
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
                  tot={payment.totData}
                  per={payment.perPage}
                  active={payment.currentPage}
                  change={(page) => {
                     readPayments(dispatch, false, page, state.param);
                  }}
               />
            </AppCardFooter>
         </AppCard>
      </div>
   );
}

export default Payments;
