import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import PopUp from '../../components/Popup';
import { AppCard, AppCardBody, AppCardFooter, AppCardHead } from '../../components/AppCard';
import { Table, TableHead, TableBody, TableRaw, TableData } from '../../components/AppTable';
import { TableActionBtn, TableActionWrapper } from '../../components/TableAction';
//constant
import { popupkey } from '../../constant/popupkey';
//action
import { hidePopup } from '../../redux/action/popup';

function ViewPayment(props) {
   const dispatch = useDispatch();
   const { popup } = useSelector((state) => state);

   return (
      <PopUp
         show={popup.display[popupkey.V_INVOICE_PAYMENT]}
         close={(e) => {
            hidePopup(dispatch, popupkey.V_INVOICE_PAYMENT);
         }}
         title='VIEW PAYMENT'
      >
         <Table>
            <TableHead head='Amount,Date,Reference,Method,Action' />
            <TableBody>
               <TableRaw>
                  <TableData>Rs 250.00</TableData>
                  <TableData>12/Dec/2021</TableData>
                  <TableData>1021511</TableData>
                  <TableData>Cash</TableData>
                  <TableData>
                     <TableActionWrapper>
                        <TableActionBtn ico='document-attach-outline' />
                     </TableActionWrapper>
                  </TableData>
               </TableRaw>
               <TableRaw>
                  <TableData>Rs 250.00</TableData>
                  <TableData>12/Dec/2021</TableData>
                  <TableData>1021511</TableData>
                  <TableData>Cash</TableData>
                  <TableData>
                     <TableActionWrapper>
                        <TableActionBtn ico='document-attach-outline' />
                     </TableActionWrapper>
                  </TableData>
               </TableRaw>
               <TableRaw>
                  <TableData>Rs 250.00</TableData>
                  <TableData>12/Dec/2021</TableData>
                  <TableData>1021511</TableData>
                  <TableData>Cash</TableData>
                  <TableData>
                     <TableActionWrapper>
                        <TableActionBtn ico='document-attach-outline' />
                     </TableActionWrapper>
                  </TableData>
               </TableRaw>
               <TableRaw>
                  <TableData>Rs 250.00</TableData>
                  <TableData>12/Dec/2021</TableData>
                  <TableData>1021511</TableData>
                  <TableData>Cash</TableData>
                  <TableData>
                     <TableActionWrapper>
                        <TableActionBtn ico='document-attach-outline' />
                     </TableActionWrapper>
                  </TableData>
               </TableRaw>
               <TableRaw>
                  <TableData>Rs 250.00</TableData>
                  <TableData>12/Dec/2021</TableData>
                  <TableData>1021511</TableData>
                  <TableData>Cash</TableData>
                  <TableData>
                     <TableActionWrapper>
                        <TableActionBtn ico='document-attach-outline' />
                     </TableActionWrapper>
                  </TableData>
               </TableRaw>
               <TableRaw>
                  <TableData>Rs 250.00</TableData>
                  <TableData>12/Dec/2021</TableData>
                  <TableData>1021511</TableData>
                  <TableData>Cash</TableData>
                  <TableData>
                     <TableActionWrapper>
                        <TableActionBtn ico='document-attach-outline' />
                     </TableActionWrapper>
                  </TableData>
               </TableRaw>
               <TableRaw>
                  <TableData>Rs 250.00</TableData>
                  <TableData>12/Dec/2021</TableData>
                  <TableData>1021511</TableData>
                  <TableData>Cash</TableData>
                  <TableData>
                     <TableActionWrapper>
                        <TableActionBtn ico='document-attach-outline' />
                     </TableActionWrapper>
                  </TableData>
               </TableRaw>
            </TableBody>
         </Table>
      </PopUp>
   );
}

export { ViewPayment };
