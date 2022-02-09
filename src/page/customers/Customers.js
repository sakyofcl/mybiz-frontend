import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import Badge from '../../components/Badge';
import CreateCustomer from './CreateCustomer';
import UpdateCustomer from './UpdateCustomer';
import DeleteCustomer from './DeleteCustomer';
import { Filter, FilterItem } from '../../components/Filter';
import { AppPagination } from '../../components/AppPagination';
//logic
import { readCustomer } from '../../logic/customer';
import { Head } from '../../logic/Head';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import Number from '../../lib/Number';
function Customers(props) {
   Head.setTitle('Customers | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { customer } = useSelector((state) => state);
   const [state, setState] = useState({ param: '' });
   useEffect(() => {
      readCustomer(dispatch, customer.dataFetched);
   }, []);
   const formik = useFormik({
      initialValues: {
         customer_id: '',
         type_id: '',
         name: '',
         contact: '',
         address: '',
         city: '',
         email: '',
         status: '',
      },
      validationSchema: yup.object({
         customer_id: yup.number(),
         type_id: yup.number(),
         contact: yup.number(),
      }),
      onSubmit: (formData) => {
         let param = '';
         Object.keys(formData).map((key) => {
            if (formData[key] !== '') {
               param += key + '=' + formData[key] + '&';
            }
         });
         if (param !== '') {
            //readInvoice(dispatch, false, invoice.currentPage, param);
            readCustomer(dispatch, false, customer.currentPage, param);
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
            <AppCardHead title='All Customers' sub='Total : 1520'>
               <CreateCustomer />
            </AppCardHead>
            <AppCardBody>
               <form onSubmit={formik.handleSubmit} autoComplete='off'>
                  <Filter
                     reset={(e) => {
                        formik.resetForm();
                        readCustomer(dispatch, false, 1, '');
                        setState(
                           ChangeState(state, {
                              param: '',
                           })
                        );
                     }}
                  >
                     <FilterItem type='text' label='Customer No' name='customer_id' value={formik.values.customer_id} change={formik.handleChange} />
                     <FilterItem type='text' label='Name' name='name' value={formik.values.name} change={formik.handleChange} />
                     <FilterItem type='text' label='Contact' name='contact' value={formik.values.contact} change={formik.handleChange} />
                     <FilterItem type='text' label='Email' name='email' value={formik.values.email} change={formik.handleChange} />
                     <FilterItem type='text' label='Address' name='address' value={formik.values.address} change={formik.handleChange} />
                     <FilterItem type='text' label='City' name='city' value={formik.values.city} change={formik.handleChange} />
                     <FilterItem
                        type='select'
                        label='Status'
                        change={formik.handleChange}
                        value={formik.values.status}
                        name='status'
                        render={() => {
                           return (
                              <>
                                 <option value='active'>Active</option>
                              </>
                           );
                        }}
                     />
                  </Filter>
               </form>
               <Table>
                  <TableHead head='CID,Name,Type,Contact,Address,City,Email,Status,Action' />
                  <TableBody>
                     {customer.data.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>{v.cid}</TableData>
                              <TableData>{v.name}</TableData>
                              <TableData>{v.type ? v.type : 'unknown'}</TableData>
                              <TableData>{v.contact ? v.contact : 'unknown'}</TableData>
                              <TableData>{v.address ? v.address : 'unknown'}</TableData>
                              <TableData>{v.city ? v.city : 'unknown'}</TableData>
                              <TableData>{v.email ? v.email : 'unknown'}</TableData>
                              <TableData>{v.status === 'active' ? <Badge title='Active' cls='bg-success' /> : <Badge title='deActive' cls='bg-danger' />}</TableData>
                              <TableData>
                                 <div className='action-wrapper'>
                                    <DeleteCustomer />
                                    <UpdateCustomer />
                                 </div>
                              </TableData>
                           </TableRaw>
                        );
                     })}
                     {/* DISPLAY SUMMARY DETAILS */}
                     <TableRaw cls='table-summary-row'></TableRaw>
                     <TableRaw>
                        <TableData>{Number.thousandSeprater(parseInt(customer.dataSummary.total_customer ? customer.dataSummary.total_customer : 0))}</TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData></TableData>
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
                  tot={customer.totData}
                  per={customer.perPage}
                  active={customer.currentPage}
                  change={(page) => {
                     readCustomer(dispatch, false, page, state.param);
                  }}
               />
            </AppCardFooter>
         </AppCard>
      </div>
   );
}

export default Customers;
