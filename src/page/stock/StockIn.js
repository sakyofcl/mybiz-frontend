import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { ActionButton } from '../../components/ActionButton';
import AddStock from './AddStock';
import { Filter, FilterItem } from '../../components/Filter';
import { AppPagination } from '../../components/AppPagination';
//Logic
import { readStockIn } from '../../logic/stock';
import { fetchDeliveryMode } from '../../logic/deliverymode';
import { fetchSupplierData } from '../../logic/supplier';
import { fetchReceiverData } from '../../logic/receiver';
import { Head } from '../../logic/Head';
//action
import { showPopup } from '../../redux/action/popup';
//constant
import { popupkey } from '../../constant/popupkey';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import Number from '../../lib/Number';
function StockIn(props) {
   Head.setTitle('Stock In | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { stock, deliverymode, supplier, receiver } = useSelector((state) => state);
   const [state, setState] = useState({ param: '' });
   useEffect(() => {
      readStockIn(dispatch, stock.dataFetched);
      fetchDeliveryMode(dispatch, deliverymode.dataFetched);
      fetchSupplierData(dispatch, 'code');
      fetchReceiverData(dispatch);
   }, []);
   const formik = useFormik({
      initialValues: {
         barcode: '',
         name1: '',
         stock_in_id: '',
         user_id: '',
         supplier_id: '',
         delivery_mode_id: '',
         received_date: '',
         min_max_by: '',
         min: '',
         max: '',
      },
      validationSchema: yup.object({
         barcode: yup.number(),
         stock_in_id: yup.number(),
         user_id: yup.number(),
         supplier_id: yup.number(),
         delivery_mode_id: yup.number(),
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
            readStockIn(dispatch, false, stock.currentPage, param);
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
            <AppCardHead title='All Stock In History'>
               <ActionButton
                  text='ADD STOCK'
                  click={(e) => {
                     showPopup(dispatch, popupkey.C_STOCK);
                  }}
                  cls='btn-danger'
               />
            </AppCardHead>

            <AppCardBody>
               <form onSubmit={formik.handleSubmit} autoComplete='off'>
                  <Filter
                     reset={(e) => {
                        formik.resetForm();
                        readStockIn(dispatch, false, 1, '');
                        setState(
                           ChangeState(state, {
                              param: '',
                           })
                        );
                     }}
                  >
                     <FilterItem type='text' label='Barcode' name='barcode' value={formik.values.barcode} change={formik.handleChange} />
                     <FilterItem type='text' label='Batch No' name='stock_in_id' value={formik.values.stock_in_id} change={formik.handleChange} />
                     <FilterItem
                        type='select'
                        label='Receiver'
                        change={formik.handleChange}
                        value={formik.values.user_id}
                        name='user_id'
                        render={() => {
                           return receiver.receiverCode.map((v) => {
                              return <option value={v.id}>{v.name}</option>;
                           });
                        }}
                     />
                     <FilterItem
                        type='select'
                        label='Supplier'
                        change={formik.handleChange}
                        value={formik.values.supplier_id}
                        name='supplier_id'
                        render={() => {
                           return supplier.supplierCode.map((v, i) => {
                              return <option value={v.supplier_id}>{v.code}</option>;
                           });
                        }}
                     />
                     <FilterItem
                        type='select'
                        label='Delivery mode'
                        change={formik.handleChange}
                        value={formik.values.delivery_mode_id}
                        name='delivery_mode_id'
                        render={() => {
                           return deliverymode.data.map((v) => {
                              return <option value={v.delivery_mode_id}>{v.name}</option>;
                           });
                        }}
                     />
                     <FilterItem type='text' label='Name1' name='name1' value={formik.values.name1} change={formik.handleChange} />
                     <FilterItem type='date' label='Received date' name='received_date' value={formik.values.received_date} change={formik.handleChange} />
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
                                 <option value='price'>Price</option>
                              </>
                           );
                        }}
                     />
                  </Filter>
               </form>
               <Table>
                  <TableHead head='Barcode,Product Name,Batch No,Quantity,Price,Receiver,Supplier,Delivery Mode,Delivery Date,Remark' />
                  <TableBody>
                     {stock.data.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>{v.barcode}</TableData>
                              <TableData>{v.name1}</TableData>
                              <TableData>BN{v.batch}</TableData>
                              <TableData>{v.qty}</TableData>
                              <TableData>Rs {v.price ? v.price : 'unknown'}</TableData>
                              <TableData>{v.receiver ? v.receiver : 'unknown'}</TableData>
                              <TableData>{v.supplier ? v.supplier : 'unknown'}</TableData>
                              <TableData>{v.mode ? v.mode : 'unknown'}</TableData>
                              <TableData>{v.received_date ? v.received_date : 'unknown'}</TableData>
                              <TableData>{v.remark ? v.remark : 'unknown'}</TableData>
                           </TableRaw>
                        );
                     })}
                     {/* DISPLAY SUMMARY DETAILS */}
                     <TableRaw cls='table-summary-row'></TableRaw>
                     <TableRaw>
                        <TableData>{Number.thousandSeprater(parseInt(stock.dataSummary.total_product ? stock.dataSummary.total_product : 0))}</TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData>{Number.thousandSeprater(parseInt(stock.dataSummary.total_qty ? stock.dataSummary.total_qty : 0))}</TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(stock.dataSummary.total_amount ? stock.dataSummary.total_amount : 0).toFixed(2))}</TableData>
                        <TableData></TableData>
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
                  tot={stock.totData}
                  per={stock.perPage}
                  active={stock.currentPage}
                  change={(page) => {
                     readStockIn(dispatch, false, page, state.param);
                  }}
               />
            </AppCardFooter>
         </AppCard>
         {/*========================== ADD STOCK ==============================*/}
         <AddStock />
      </div>
   );
}

export default StockIn;
