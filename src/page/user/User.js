import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
//components
import { AppCard, AppCardBody, AppCardHead, AppCardFooter } from '../../components/AppCard';
import { Table, TableBody, TableData, TableHead, TableRaw } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import Badge from '../../components/Badge';
import { ActionButton } from '../../components/ActionButton';
import { AppPagination } from '../../components/AppPagination';
import { Filter, FilterItem } from '../../components/Filter';
import { Option } from '../../components/CustomFormItem';
import AccessDenied from '../../components/AccessDenied';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import CreateUser from './CreateUser';
//Action
import { showPopup } from '../../redux/action/popup';
//constant
import { popupkey } from '../../constant/popupkey';
//logic
import { Head } from '../../logic/Head';
import { readUser } from '../../logic/user';
import { readRole } from '../../logic/role';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import { checkAccess } from '../../lib/CheckAccess';

function User() {
   Head.setTitle('User | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { location, popup, appmodule, user, role } = useSelector((state) => state);
   const [state, setState] = useState({ pos: 0, module: 23, param: '' });
   useEffect(() => {
      readUser(dispatch, user.fetchData);
      readRole(dispatch, role.fetchData);
      checkAccess(
         dispatch,
         appmodule,
         state.module,
         'r',
         () => {},
         () => {
            showPopup(dispatch, popupkey.USER_ACCESS_DENIED);
         }
      );
   }, []);
   const formik = useFormik({
      initialValues: {
         user_id: '',
         name: '',
         email: '',
         contact: '',
         role_id: '',
         status: '',
      },
      validationSchema: yup.object({
         user_id: yup.number(),
         name: yup.string(),
         email: yup.string(),
         contact: yup.string(),
         role_id: yup.number(),
         status: yup.string(),
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
                  readUser(dispatch, false, 1, param);
               }
               setState(
                  ChangeState(state, {
                     param: param,
                  })
               );
            },
            () => {
               showPopup(dispatch, popupkey.USER_ACCESS_DENIED);
            }
         );
      },
   });

   return (
      <div className='app-content'>
         <div className='row m-0 p-0'>
            <div className='col-md-12'>
               <AppCard>
                  <AppCardHead title='All Users' sub={`Total : ${user.dataSummary.total_user}`}>
                     <ActionButton
                        text='CREATE USER'
                        cls='btn-danger'
                        click={(e) => {
                           checkAccess(
                              dispatch,
                              appmodule,
                              state.module,
                              'c',
                              () => {
                                 showPopup(dispatch, popupkey.C_USER);
                              },
                              () => {
                                 showPopup(dispatch, popupkey.USER_ACCESS_DENIED);
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
                                    readUser(dispatch, false, 1, '');
                                    setState(
                                       ChangeState(state, {
                                          param: '',
                                       })
                                    );
                                 },
                                 () => {
                                    showPopup(dispatch, popupkey.USER_ACCESS_DENIED);
                                 }
                              );
                           }}
                        >
                           <FilterItem type='text' label='Code' name='user_id' value={formik.values.user_id} change={formik.handleChange} />
                           <FilterItem type='text' label='Name' name='name' value={formik.values.name} change={formik.handleChange} />
                           <FilterItem type='text' label='Email' name='email' value={formik.values.email} change={formik.handleChange} />
                           <FilterItem type='text' label='Contact' name='contact' value={formik.values.contact} change={formik.handleChange} />
                           <FilterItem
                              type='select'
                              label='Role'
                              change={formik.handleChange}
                              value={formik.values.role_id}
                              name='role_id'
                              render={() => {
                                 return role.data.map((v, i) => {
                                    return <Option v={v.role_id} t={v.name} key={i} />;
                                 });
                              }}
                           />
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
                                       <option value='deactive'>Deactive</option>
                                    </>
                                 );
                              }}
                           />
                        </Filter>
                     </form>
                     <Table>
                        <TableHead head='code,name,email,contact,role,status,action' />

                        <TableBody>
                           {user.data.map((v, i) => {
                              return (
                                 <TableRaw key={i}>
                                    <TableData>{v.user_id}</TableData>
                                    <TableData>{v.name}</TableData>
                                    <TableData>{v.email}</TableData>
                                    <TableData>{v.contact ? v.contact : 'unknown'}</TableData>
                                    <TableData>{v.role}</TableData>
                                    <TableData>{v.status === 'active' ? <Badge title='Active' cls='bg-success' /> : <Badge title='Deactive' cls='bg-danger' />}</TableData>
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
                                                      showPopup(dispatch, popupkey.U_USER);
                                                   },
                                                   () => {
                                                      showPopup(dispatch, popupkey.USER_ACCESS_DENIED);
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
                                                      showPopup(dispatch, popupkey.D_USER);
                                                   },
                                                   () => {
                                                      showPopup(dispatch, popupkey.USER_ACCESS_DENIED);
                                                   }
                                                );
                                             }}
                                          />
                                       </TableActionWrapper>
                                    </TableData>
                                 </TableRaw>
                              );
                           })}
                        </TableBody>
                     </Table>
                  </AppCardBody>
                  <AppCardFooter>
                     <AppPagination
                        tot={user.totData}
                        per={user.perPage}
                        active={user.currentPage}
                        change={(page) => {
                           readUser(dispatch, false, page, state.param);
                        }}
                     />
                  </AppCardFooter>
               </AppCard>
            </div>
         </div>

         {/*-------------------------------------[ POPUP COMPONENTS]------------------------------------*/}

         {popup.display[popupkey.U_USER] ? <UpdateUser pos={state.pos} /> : ''}
         {popup.display[popupkey.D_USER] ? <DeleteUser pos={state.pos} /> : ''}
         <CreateUser />
         <AccessDenied displayKey={popupkey.USER_ACCESS_DENIED} />
         {/*-------------------------------------[ END POPUP COMPONENTS]------------------------------------*/}
      </div>
   );
}

export default User;
