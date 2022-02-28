import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//components
import { AppCard, AppCardBody, AppCardHead, AppCardFooter } from '../../components/AppCard';
import { Table, TableBody, TableData, TableHead, TableRaw } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import DeleteLocation from './DeleteLocation';
import UpdateLocation from './UpdateLocation';
import CreateLocation from './CreateLocation';
import AccessDenied from '../../components/AccessDenied';
import AppButton from '../../components/AppButton';
//Action
import { showPopup } from '../../redux/action/popup';
//constant
import { popupkey } from '../../constant/popupkey';
//logic
import { readLocation } from '../../logic/location';
import { Head } from '../../logic/Head';

//Lib
import { ChangeState } from '../../lib/ChangeState';
import Number from '../../lib/Number';
import { checkAccess } from '../../lib/CheckAccess';

function Location() {
   Head.setTitle('Locations | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { location, popup, appmodule } = useSelector((state) => state);
   const [state, setState] = useState({ pos: 0, module: 17 });
   useEffect(() => {
      readLocation(dispatch, location.dataFetched);
      checkAccess(
         dispatch,
         appmodule,
         state.module,
         'r',
         () => {},
         () => {
            showPopup(dispatch, popupkey.LOCATION_ACCESS_DENIED);
         }
      );
   }, []);

   return (
      <div className='app-content'>
         <div className='row m-0 p-0'>
            <div className='col-12 col-md-7'>
               <AppCard>
                  <AppCardHead title='All Location' sub='Total : 10'>
                     <AppButton
                        text='CREATE LOCATION'
                        click={(e) => {
                           checkAccess(
                              dispatch,
                              appmodule,
                              state.module,
                              'c',
                              () => {
                                 showPopup(dispatch, popupkey.C_LOCATION);
                              },
                              () => {
                                 showPopup(dispatch, popupkey.LOCATION_ACCESS_DENIED);
                              }
                           );
                        }}
                        cls='btn-danger'
                     />
                  </AppCardHead>

                  <AppCardBody>
                     <Table>
                        <TableHead head='Name,Total Products,Action' />
                        <TableBody>
                           {location.data.map((v, i) => {
                              return (
                                 <TableRaw key={i}>
                                    <TableData>{v.name}</TableData>
                                    <TableData>0</TableData>
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
                                                      showPopup(dispatch, popupkey.U_LOCATION);
                                                   },
                                                   () => {
                                                      showPopup(dispatch, popupkey.LOCATION_ACCESS_DENIED);
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
                                                      showPopup(dispatch, popupkey.D_LOCATION);
                                                   },
                                                   () => {
                                                      showPopup(dispatch, popupkey.LOCATION_ACCESS_DENIED);
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
                  <AppCardFooter></AppCardFooter>
               </AppCard>
            </div>
         </div>

         {/*-------------------------------------[ POPUP COMPONENTS]------------------------------------*/}
         {popup.display[popupkey.U_LOCATION] ? <UpdateLocation pos={state.pos} /> : ''}
         <DeleteLocation pos={state.pos} />
         <AccessDenied displayKey={popupkey.LOCATION_ACCESS_DENIED} />
         <CreateLocation />

         {/*-------------------------------------[ END POPUP COMPONENTS]------------------------------------*/}
      </div>
   );
}

export default Location;
