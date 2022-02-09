import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components

import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import Badge from '../../components/Badge';
import CreateInvoice from './CreateInvoice';

//Logic
import { readInvoice } from '../../logic/invoice';

function Sales(props) {
   const dispatch = useDispatch();
   const { invoice } = useSelector((state) => state);
   useEffect(() => {
      readInvoice(dispatch, invoice.dataFetched);
   }, []);
   return (
      <div className='app-content'>
         <AppCard>
            <AppCardHead title='All Invoices'>
               <CreateInvoice />
            </AppCardHead>

            <AppCardBody>
               <Table>
                  <TableHead head='Invoice No,Customer Name,Amount,Ref,Sale Type,Payment Status,Date' />
                  <TableBody>
                     {invoice.data.map((v, i) => {
                        return (
                           <TableRaw key={i}>
                              <TableData>IN{v.invoice_id}</TableData>
                              <TableData>{v.customer_name}</TableData>
                              <TableData>Rs {v.total_amount}</TableData>
                              <TableData>{v.sales_ref}</TableData>
                              <TableData>{v.sale_type}</TableData>
                              <TableData>{v.payment_status === 1 ? <Badge title='paid' cls='bg-success' /> : <Badge title='unpaid' cls='bg-danger' />}</TableData>

                              <TableData>{v.invoice_date}</TableData>
                           </TableRaw>
                        );
                     })}
                  </TableBody>
               </Table>
            </AppCardBody>
            <AppCardFooter></AppCardFooter>
         </AppCard>
      </div>
   );
}

export default Sales;
