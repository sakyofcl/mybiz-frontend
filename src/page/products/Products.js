import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { ActionButton } from '../../components/ActionButton';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import Badge from '../../components/Badge';
import { TopLoader } from '../../components/Loader';
import { Filter, FilterItem } from '../../components/Filter';
import { AppPagination } from '../../components/AppPagination';
import Alert from '../../components/Alert';
import DisplayCommonError from '../../components/DisplayCommonError';
import AccessDenied from '../../components/AccessDenied';
//action
import { showPopup } from '../../redux/action/popup';
import { hideAlert } from '../../redux/action/alert';
import { storeProduct } from '../../redux/action/product';
import { storeCategory } from '../../redux/action/category';
//constant
import { popupkey } from '../../constant/popupkey';
import { alertkey } from '../../constant/alertkey';
import api from '../../constant/api';
//logic
import { getCategoryGroup } from '../../logic/category';
import { readLocation } from '../../logic/location';
import { readUnit } from '../../logic/unit';
import { fetchProduct, getNextBarcode } from '../../logic/product';
import { Head } from '../../logic/Head';

//Lib
import { ChangeState } from '../../lib/ChangeState';
import Number from '../../lib/Number';
import { checkAccess } from '../../lib/CheckAccess';
function Products(props) {
   Head.setTitle('Products | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { product, category, location, unit, popup, alert, appmodule } = useSelector((state) => state);
   const [state, setState] = useState({
      subcat: [],
      param: '',
      pos: 0,
      module: 15,
   });

   useEffect(() => {
      fetchProduct(dispatch, product.dataFetched);
      getCategoryGroup(dispatch, category.dataFetched);
      readLocation(dispatch, location.dataFetched);
      readUnit(dispatch, unit.dataFetched);
      getNextBarcode(dispatch);

      checkAccess(
         dispatch,
         appmodule,
         state.module,
         'r',
         () => {},
         () => {
            showPopup(dispatch, popupkey.PRODUCT_ACCESS_DENIED);
         }
      );
   }, []);

   const formik = useFormik({
      initialValues: {
         pid: '',
         barcode: '',
         cat_id: '',
         subcat_id: '',
         location_id: '',
         unit: '',
         name1: '',
         name2: '',
         min_max_by: '',
         min: '',
         max: '',
      },
      validationSchema: yup.object({
         pid: yup.number(),
         barcode: yup.number(),
         cat_id: yup.number(),
         subcat_id: yup.number(),
         location_id: yup.number(),
         unit: yup.number(),
         name1: yup.string(),
         name2: yup.string(),
         min: yup.number(),
         max: yup.number(),
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
                  fetchProduct(dispatch, false, product.currentPage, param);
               }
               setState(
                  ChangeState(state, {
                     param: param,
                  })
               );
            },
            () => {
               showPopup(dispatch, popupkey.PRODUCT_ACCESS_DENIED);
            }
         );
      },
   });

   return (
      <div className='app-content'>
         <AppCard>
            <AppCardHead title='All Products' sub='Total : 1520'>
               <ActionButton
                  text='CREATE PRODUCT'
                  click={(e) => {
                     checkAccess(
                        dispatch,
                        appmodule,
                        state.module,
                        'c',
                        () => {
                           showPopup(dispatch, popupkey.C_PRODUCT);
                        },
                        () => {
                           console.log('work');
                           showPopup(dispatch, popupkey.PRODUCT_ACCESS_DENIED);
                        }
                     );
                  }}
                  cls='btn-danger'
               />
            </AppCardHead>

            <AppCardBody>
               <DisplayCommonError />
               <form onSubmit={formik.handleSubmit} autoComplete='off'>
                  <Filter
                     reset={(e) => {
                        checkAccess(
                           dispatch,
                           appmodule,
                           state.module,
                           'c',
                           () => {
                              formik.resetForm();
                              fetchProduct(dispatch, false, 1, '');
                              setState(
                                 ChangeState(state, {
                                    param: '',
                                 })
                              );
                           },
                           () => {
                              showPopup(dispatch, popupkey.PRODUCT_ACCESS_DENIED);
                           }
                        );
                     }}
                  >
                     <FilterItem type='text' label='Pid' name='pid' value={formik.values.pid} change={formik.handleChange} />
                     <FilterItem type='text' label='Barcode' name='barcode' value={formik.values.barcode} change={formik.handleChange} />
                     <FilterItem
                        type='select'
                        label='Category'
                        change={(e) => {
                           formik.setFieldValue('cat_id', e.target.value);
                           category.data.map((v, i) => {
                              if (e.target.value == v.cat_id) {
                                 setState(
                                    ChangeState(state, {
                                       subcat: v.subCategory,
                                    })
                                 );
                              }
                           });
                        }}
                        value={formik.values.cat_id}
                        name='cat_id'
                        render={() => {
                           return category.data.map((v, i) => {
                              return <option value={v.cat_id}>{v.name}</option>;
                           });
                        }}
                     />
                     <FilterItem
                        type='select'
                        label='Sub category'
                        change={formik.handleChange}
                        value={formik.values.subcat_id}
                        name='subcat_id'
                        render={() => {
                           return state.subcat.map((v) => {
                              return <option value={v.subcat_id}>{v.name}</option>;
                           });
                        }}
                     />
                     <FilterItem
                        type='select'
                        label='Location'
                        change={formik.handleChange}
                        value={formik.values.location_id}
                        name='location_id'
                        render={() => {
                           return location.data.map((v, i) => {
                              return <option value={v.location_id}>{v.name}</option>;
                           });
                        }}
                     />
                     <FilterItem
                        type='select'
                        label='Unit'
                        change={formik.handleChange}
                        value={formik.values.unit}
                        name='unit'
                        render={() => {
                           return unit.data.map((v) => {
                              return <option value={v.unit}>{v.name}</option>;
                           });
                        }}
                     />
                     <FilterItem type='text' label='Name1' name='name1' value={formik.values.name1} change={formik.handleChange} />
                     <FilterItem type='text' label='Name2' name='name2' value={formik.values.name2} change={formik.handleChange} />

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
                                 <option value='sell_price'>Sell price</option>
                                 <option value='cash_price'>Cash price</option>
                                 <option value='cost_price'>Cost price</option>
                              </>
                           );
                        }}
                     />
                  </Filter>
               </form>
               <Table>
                  <TableHead head='Pid,Barcode,Name1,Name2,Qty,Ro Level,Location,Category,Sub Category,Unit,Cost Price,Sell Price,Cash Price,Max Price,Vat,Discount,Action' />
                  <TableBody>
                     {product.data.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>{v.pid}</TableData>
                              <TableData>{v.barcode}</TableData>
                              <TableData>{v.name1}</TableData>
                              <TableData>{v.name2 ? v.name2 : 'unknown'}</TableData>
                              <TableData>{v.re_order_level <= v.qty ? v.qty : <Badge title={v.qty} cls='bg-danger' />}</TableData>
                              <TableData>{v.re_order_level}</TableData>
                              <TableData>{v.location ? v.location : 'unknown'}</TableData>
                              <TableData>{v.category}</TableData>
                              <TableData>{v.subcategory ? v.subcategory : 'unknown'}</TableData>
                              <TableData>{v.unit ? v.unit : 'unknown'}</TableData>
                              <TableData>{v.cost_price}</TableData>
                              <TableData>{v.sell_price}</TableData>
                              <TableData>{v.cash_price}</TableData>
                              <TableData>{v.max_price}</TableData>
                              <TableData>{v.vat}</TableData>
                              <TableData>{v.discount}</TableData>
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
                                                showPopup(dispatch, popupkey.U_PRODUCT);
                                             },
                                             () => {
                                                showPopup(dispatch, popupkey.PRODUCT_ACCESS_DENIED);
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
                                                showPopup(dispatch, popupkey.D_PRODUCT);
                                             },
                                             () => {
                                                showPopup(dispatch, popupkey.PRODUCT_ACCESS_DENIED);
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
                        <TableData></TableData>
                        <TableData>{Number.thousandSeprater(parseInt(product.dataSummary.total_product ? product.dataSummary.total_product : 0))}</TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData>{Number.thousandSeprater(parseInt(product.dataSummary.total_qty ? product.dataSummary.total_qty : 0))}</TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData></TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(product.dataSummary.total_cost_price ? product.dataSummary.total_cost_price : 0).toFixed(2))} </TableData>
                        <TableData>Rs {Number.thousandSeprater(parseFloat(product.dataSummary.total_sell_price ? product.dataSummary.total_sell_price : 0).toFixed(2))} </TableData>
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
                  tot={product.totData}
                  per={product.perPage}
                  active={product.currentPage}
                  change={(page) => {
                     fetchProduct(dispatch, false, page, state.param);
                  }}
               />
            </AppCardFooter>
         </AppCard>

         {/*-------------------------------------[ POPUP COMPONENTS]------------------------------------*/}
         <CreateProduct />
         {popup.display[popupkey.U_PRODUCT] ? <UpdateProduct pos={state.pos} /> : ''}

         <DeleteProduct pos={state.pos} />
         <AccessDenied displayKey={popupkey.PRODUCT_ACCESS_DENIED} />
         {/*-------------------------------------[ END POPUP COMPONENTS]------------------------------------*/}
      </div>
   );
}

export default Products;
