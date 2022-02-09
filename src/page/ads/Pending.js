import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../../constant/api';
import { appUrl } from '../../constant/api';
import type from '../../constant/type';
import { FetchPending } from '../../logic/Ads';
import { DataTable, DataTableHead, DataTableFooter, DataTableBody, Table, TableHead, TableBody, TableRaw, TableData } from '../../components/DataTable';
import { DateExtract } from '../../lib/DateExtract';
class Pending extends React.Component {
   handleCarView(e) {
      const url = appUrl + '/car/info?v=';
      const cid = e.target.dataset.cid;
      window.open(url + cid);
   }

   handleStatusChange(e) {
      let token = sessionStorage.getItem('token');
      let current = e.target.dataset.status;
      let cid = parseInt(e.target.dataset.cid);
      const { dispatch } = this.props;

      let url = api.changeAdsStatus('active', token, cid);

      if (current === 'rejected') {
         url = api.changeAdsStatus('rejected', token, cid);
      }

      axios.get(url).then((res) => {
         if (res.data.status) {
            FetchPending(dispatch);
         }
      });
   }

   render() {
      const { ads } = this.props;
      let dateObj = new DateExtract();
      return (
         <Table>
            <TableHead head='ID,Model,Name,Type,Posted Date,View,Action' />
            <TableBody>
               {ads.data.map((v) => {
                  const { cid, model, brand, date, status, uid, userName } = v;
                  return (
                     <TableRaw key={cid}>
                        <TableData>{cid}</TableData>
                        <TableData>
                           <span style={{ marginRight: 5 }}>
                              {model !== '0' ? model : 'unknown'}
                              {' > '}
                           </span>
                           <span>{brand !== '0' ? brand : 'unknown'}</span>
                        </TableData>
                        <TableData>{userName === '0' ? 'unknown' : userName}</TableData>
                        <TableData>{status}</TableData>
                        <TableData>{dateObj.humanReadbleDate(date, 'd-M-y', '/')}</TableData>
                        <TableData>
                           <div className='action-wrapper'>
                              <button
                                 type='button'
                                 class='btn'
                                 data-cid={cid}
                                 onClick={(e) => {
                                    this.handleCarView(e);
                                 }}
                              >
                                 <ion-icon data-cid={cid} name='eye-outline'></ion-icon>
                              </button>
                           </div>
                        </TableData>
                        <TableData>
                           <div className='action-wrapper'>
                              <button
                                 type='button'
                                 class='btn'
                                 data-cid={cid}
                                 data-status='active'
                                 onClick={(e) => {
                                    this.handleStatusChange(e);
                                 }}
                              >
                                 <ion-icon data-cid={cid} data-status='active' name='checkmark-outline'></ion-icon>
                              </button>
                              <button
                                 type='button'
                                 class='btn'
                                 data-cid={cid}
                                 data-status='rejected'
                                 onClick={(e) => {
                                    this.handleStatusChange(e);
                                 }}
                              >
                                 <ion-icon data-cid={cid} data-status='rejected' name='close-outline'></ion-icon>
                              </button>
                           </div>
                        </TableData>
                     </TableRaw>
                  );
               })}
            </TableBody>
         </Table>
      );
   }
}

//connect redux store for reading data from global store.
const mapStateToProps = (state) => {
   return {
      ads: state.ads,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      dispatch: dispatch,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
