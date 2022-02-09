import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components
import { DataTable, DataTableHead, DataTableFooter, DataTableBody, Table, TableHead, TableBody, TableRaw, TableData } from '../../components/DataTable';
import AddStock from './AddStock';
import { Filter, FilterItem } from '../../components/Filter';

//Logic
import { readStockIn } from '../../logic/stock';
function Stock(props) {
   const dispatch = useDispatch();
   const { stock } = useSelector((state) => state);
   useEffect(() => {
      readStockIn(dispatch, stock.dataFetched);
   }, []);
   return (
      <div className='app-content'>
         <DataTable>
            <DataTableHead title='All Stock In History'>
               <AddStock />
            </DataTableHead>

            <DataTableBody>
               <Filter>
                  <FilterItem label='Barcode' />
                  <FilterItem label='Min Price' />
                  <FilterItem label='Max Price' />
                  <FilterItem label='Name' />
                  <FilterItem label='Batch No' type='select' />
                  <FilterItem label='Category' type='select' />
                  <FilterItem label='Sub Category' type='select' />
                  <FilterItem label='Delivery' type='select' />
                  <FilterItem label='Delivery Date' type='date' />
               </Filter>
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
                              <TableData>Rs {v.price}</TableData>
                              <TableData>{v.receiver}</TableData>
                              <TableData>{v.supplier}</TableData>
                              <TableData>{v.mode}</TableData>
                              <TableData>{v.received_date}</TableData>
                              <TableData>{v.remark}</TableData>
                           </TableRaw>
                        );
                     })}
                  </TableBody>
               </Table>
            </DataTableBody>
            <DataTableFooter></DataTableFooter>
         </DataTable>
      </div>
   );
}

export default Stock;
