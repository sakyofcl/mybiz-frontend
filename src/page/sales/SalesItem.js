import React from 'react';

//components
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import Badge from '../../components/Badge';
import { Filter, FilterItem } from '../../components/Filter';
function SalesItem(props) {
   return (
      <div className='app-content'>
         <AppCard>
            <AppCardHead title='All Sales Items' />

            <AppCardBody>
               <Table>
                  <TableHead head='Barcode,Name,Quantity,Price,Invoice No,Customer,Date' />
                  <TableBody>
                     <TableRaw>
                        <TableData>P25</TableData>
                        <TableData>Pepsi</TableData>
                        <TableData>12</TableData>
                        <TableData>Rs 1500.00</TableData>
                        <TableData>IN102</TableData>
                        <TableData>Ahk pvt</TableData>
                        <TableData>12/Dec/2021</TableData>
                     </TableRaw>
                  </TableBody>
               </Table>
            </AppCardBody>
            <AppCardFooter></AppCardFooter>
         </AppCard>
      </div>
   );
}

export default SalesItem;
