import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import Badge from '../../components/Badge';
import CreateCustomer from './CreateCustomer';
import UpdateCustomer from './UpdateCustomer';
import DeleteCustomer from './DeleteCustomer';
import { Filter, FilterItem } from '../../components/Filter';
import { AppPagination } from '../../components/AppPagination';
import AccessDenied from '../../components/AccessDenied';
import { ActionButton } from '../../components/ActionButton';
import DisplayCustomerStatus from './components/DisplayCustomerStatus';
//Action
import { showPopup } from '../../redux/action/popup';
//constant
import { popupkey } from '../../constant/popupkey';
//logic
import { readCustomer } from '../../logic/customer';
import { readCustomerType } from '../../logic/customertype';
import { Head } from '../../logic/Head';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import Number from '../../lib/Number';
import { checkAccess } from '../../lib/CheckAccess';
function Customers(props) {
   Head.setTitle('Customers | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { customer, popup, customertype, appmodule } = useSelector((state) => state);
   const [state, setState] = useState({ param: '', pos: 0, module: 8 });
   useEffect(() => {
      readCustomer(dispatch, customer.dataFetched);
      readCustomerType(dispatch, customertype.dataFetched);
      checkAccess(
         dispatch,
         appmodule,
         state.module,
         'r',
         () => {},
         () => {
            showPopup(dispatch, popupkey.CUSTOMER_ACCESS_DENIED);
         }
      );
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
         checkAccess(
            dispatch,
            appmodule,
            state.module,
            'r',
            () => {
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
            () => {
               showPopup(dispatch, popupkey.CUSTOMER_ACCESS_DENIED);
            }
         );
      },
   });
   return (
      <div className='app-content'>
         <AppCard>
            <AppCardHead title='All Customers' sub='Total : 1520'>
               <ActionButton
                  text='CREATE CUSTOMER'
                  cls='btn-danger'
                  click={(e) => {
                     checkAccess(
                        dispatch,
                        appmodule,
                        state.module,
                        'c',
                        () => {
                           showPopup(dispatch, popupkey.C_CUSTOMER);
                        },
                        () => {
                           showPopup(dispatch, popupkey.CUSTOMER_ACCESS_DENIED);
                        }
                     );
                  }}
               />
            </AppCardHead>
            <AppCardBody>
               <form onSubmit={formik.handleSubmit} autoComplete='off'>
                  <Filter
                     reset={(e) => {
                        checkAccess(
                           dispatch,
                           appmodule,
                           state.module,
                           'r',
                           () => {
                              formik.resetForm();
                              readCustomer(dispatch, false, 1, '');
                              setState(
                                 ChangeState(state, {
                                    param: '',
                                 })
                              );
                           },
                           () => {
                              showPopup(dispatch, popupkey.CUSTOMER_ACCESS_DENIED);
                           }
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
                              <TableData>
                                 <DisplayCustomerStatus status={v.status} />
                              </TableData>
                              <TableData>
                                 <TableActionWrapper>
                                    <TableActionBtn
                                       ico='create-outline'
                                       click={(e) => {
                                          checkAccess(
                                             dispatch,
                                             appmodule,
                                             state.module,
                                             'u',
                                             () => {
                                                setState(
                                                   ChangeState(state, {
                                                      pos: i,
                                                   })
                                                );
                                                showPopup(dispatch, popupkey.U_CUSTOMER);
                                             },
                                             () => {
                                                showPopup(dispatch, popupkey.CUSTOMER_ACCESS_DENIED);
                                             }
                                          );
                                       }}
                                    />
                                    <TableActionBtn
                                       ico='trash-outline'
                                       click={(e) => {
                                          checkAccess(
                                             dispatch,
                                             appmodule,
                                             state.module,
                                             'd',
                                             () => {
                                                setState(
                                                   ChangeState(state, {
                                                      pos: i,
                                                   })
                                                );
                                                showPopup(dispatch, popupkey.D_CUSTOMER);
                                             },
                                             () => {
                                                showPopup(dispatch, popupkey.CUSTOMER_ACCESS_DENIED);
                                             }
                                          );
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

         {/*-------------------------------------[ POPUP COMPONENTS]------------------------------------*/}

         <DeleteCustomer pos={state.pos} />
         {popup.display[popupkey.U_CUSTOMER] ? <UpdateCustomer pos={state.pos} /> : ''}
         <CreateCustomer />
         <AccessDenied displayKey={popupkey.CUSTOMER_ACCESS_DENIED} />

         {/*-------------------------------------[ END POPUP COMPONENTS]------------------------------------*/}
      </div>
   );
}

export default Customers;
