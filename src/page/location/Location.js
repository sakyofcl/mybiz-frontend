import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//components
import { AppCard, AppCardBody, AppCardHead, AppCardFooter } from '../../components/AppCard';
import { Table, TableBody, TableData, TableHead, TableRaw } from '../../components/AppTable';
//logic
import { readLocation } from '../../logic/location';
import { Head } from '../../logic/Head';
function Location() {
   Head.setTitle('Locations | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { location } = useSelector((state) => state);
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
                                    <TableData>+</TableData>
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

         {/*-------------------------------------[ END POPUP COMPONENTS]------------------------------------*/}
      </div>
   );
}

export default Location;
