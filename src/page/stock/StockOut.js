import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { Filter, FilterItem } from '../../components/Filter';
import { AppPagination } from '../../components/AppPagination';
//Logic
import { readStockOut } from '../../logic/stock';
import { Head } from '../../logic/Head';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import Number from '../../lib/Number';
function StockOut(props) {
   Head.setTitle('Stock Out | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { stock } = useSelector((state) => state);
   const [state, setState] = useState({ param: '' });
   useEffect(() => {
      readStockOut(dispatch, stock.out.dataFetched);
   }, []);
   const formik = useFormik({
      initialValues: {
         barcode: '',
         name: '',
         from_to_by: '',
         from: '',
         to: '',
      },
      validationSchema: yup.object({
         barcode: yup.number(),
      }),
      onSubmit: (formData) => {
         let param = '';
         Object.keys(formData).map((key) => {
            if (formData[key] !== '') {
               param += key + '=' + formData[key] + '&';
            }
         });
         if (param !== '') {
            readStockOut(dispatch, false, stock.out.currentPage, param);
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
            <AppCardHead title='All Stock Out History' />

            <AppCardBody>
               <form onSubmit={formik.handleSubmit} autoComplete='off'>
                  <Filter
                     reset={(e) => {
                        formik.resetForm();
                        readStockOut(dispatch, false, 1, '');
                        setState(
                           ChangeState(state, {
                              param: '',
                           })
                        );
                     }}
                  >
                     <FilterItem type='text' label='Barcode' name='barcode' value={formik.values.barcode} change={formik.handleChange} />
                     <FilterItem type='text' label='Name' name='name' value={formik.values.name} change={formik.handleChange} />

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
                  </Filter>
               </form>
               <Table>
                  <TableHead head='Date,Barcode,Name,Quantity,Price,Invoice No,Customer' />
                  <TableBody>
                     {stock.out.data.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>{v.create_at}</TableData>
                              <TableData>{v.barcode}</TableData>
                              <TableData>{v.name}</TableData>
                              <TableData>{v.qty}</TableData>
                              <TableData>{v.price}</TableData>
                              <TableData>{v.invoice_id}</TableData>
                              <TableData>{v.customer_name}</TableData>
                           </TableRaw>
                        );
                     })}
                     {/* DISPLAY SUMMARY DETAILS */}
                     <TableRaw cls='table-summary-row'></TableRaw>
                     <TableRaw>
                        <TableData></TableData>
                        <TableData>{Number.thousandSeprater(parseInt(stock.out.dataSummary.total_product ? stock.out.dataSummary.total_product : 0))}</TableData>
                        <TableData></TableData>
                        <TableData>{Number.thousandSeprater(parseInt(stock.out.dataSummary.total_qty ? stock.out.dataSummary.total_qty : 0))}</TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(stock.out.dataSummary.total_amount ? stock.out.dataSummary.total_amount : 0).toFixed(2))}</TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                     </TableRaw>
                     {/* END SUMMARY DETAILS */}
                  </TableBody>
               </Table>
            </AppCardBody>
            <AppCardFooter>
               <AppPagination
                  tot={stock.out.totData}
                  per={stock.out.perPage}
                  active={stock.out.currentPage}
                  change={(page) => {
                     readStockOut(dispatch, false, page, state.param);
                  }}
               />
            </AppCardFooter>
         </AppCard>
      </div>
   );
}

export default StockOut;
