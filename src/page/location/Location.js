import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//components
import { AppCard, AppCardBody, AppCardHead, AppCardFooter } from '../../components/AppCard';
import { Table, TableBody, TableData, TableHead, TableRaw } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
import DeleteLocation from './DeleteLocation';

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

function Location() {
   Head.setTitle('Locations | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { location } = useSelector((state) => state);
   const [state, setState] = useState({ pos: 0 });
   useEffect(() => {
      readLocation(dispatch, location.dataFetched);
   }, []);
   return (
      <div className='app-content'>
         <div className='row m-0 p-0'>
            <div className='col-12 col-md-7'>
               <AppCard>
                  <AppCardHead title='All Location' sub='Total : 10' />

                  <AppCardBody>
                     <Table>
                        <TableHead head='Location Name,Total Products,Action' />
                        <TableBody>
                           {location.data.map((v, i) => {
                              return (
                                 <TableRaw key={i}>
                                    <TableData>{v.name}</TableData>
                                    <TableData>0</TableData>
                                    <TableData>
                                       <TableActionWrapper>
                                          <TableActionBtn ico='create-outline' />
                                          <TableActionBtn
                                             ico='trash-outline'
                                             click={(e) => {
                                                setState(
                                                   ChangeState(state, {
                                                      pos: i,
                                                   })
                                                );
                                                showPopup(dispatch, popupkey.D_LOCATION);
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
         <DeleteLocation pos={state.pos} />
         {/*-------------------------------------[ END POPUP COMPONENTS]------------------------------------*/}
      </div>
   );
}

export default Location;
