import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//components
import { DataTable, DataTableHead, DataTableFooter, DataTableBody, Table, TableHead, TableBody, TableRaw, TableData } from '../components/DataTable';
import PopUp from '../components/Popup';
import Pending from './ads/Pending';
//constant
import api from '../constant/api';
import { appUrl } from '../constant/api';
import type from '../constant/type';
//lib
import { DateExtract } from '../lib/DateExtract';
import { FetchPending, FetchAll } from '../logic/Ads';
class Ads extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         carstatus: false,
         popupShow: false,
         delCarInfo: {
            cid: false,
         },
         carStatus: {
            cid: false,
            status: false,
         },
         tabpane: 'pending',
      };
      this.handleCarStatusChange = this.handleCarStatusChange.bind(this);
      this.handleClosePopup = this.handleClosePopup.bind(this);
      this.handlePane = this.handlePane.bind(this);
   }

   componentDidMount() {
      const { dispatch, ads } = this.props;
      if (!ads.fetchData) {
         if (this.state.tabpane === 'pending') {
            FetchPending(dispatch);
         } else {
            FetchAll(dispatch);
         }
      }
   }
   handlePaginationNumberClick(e) {
      let selectedPage = e.target.dataset.pageno;
      const { getAds } = api;
      const { STORE_ADS } = type;
      const { dispatch } = this.props;

      axios.get(getAds + '?page=' + selectedPage).then((res) => {
         const { data, total, to, per_page, current_page, last_page } = res.data.data;
         dispatch({
            type: STORE_ADS,
            payload: {
               data: data,
               totData: total,
               currentData: to,
               perPage: per_page,
               currentPage: current_page,
               lastPage: last_page,
               fetchData: true,
            },
         });
      });
   }

   handleCarView(e) {
      const url = appUrl + '/car/info?v=';
      const cid = e.target.dataset.cid;
      window.open(url + cid);
   }
   handleCarEdit(e) {
      const cid = e.target.dataset.cid;
      const uid = e.target.dataset.uid;
      const token = sessionStorage.getItem('token');
      const url = `${appUrl}/car/update?cid=${cid}&uid=${uid}&token=${token}`;
      window.open(url);
   }
   handleCarDelete(e) {
      const cid = e.target.dataset.cid;
      let newObj = Object.assign({}, this.state, {
         popupShow: true,
         delCarInfo: {
            ...this.state.delCarInfo,
            cid: cid,
         },
      });
      this.setState(newObj);
   }
   deleteCarApi(e) {
      const cid = e.target.dataset.cid;
      const { dispatch } = this.props;

      axios.post(api.deleteCar, { cid: cid, token: sessionStorage.getItem('token') }).then((res) => {
         if (res.data.status) {
            dispatch({
               type: type.DELETE_ADS,
               payload: {
                  cid: cid,
               },
            });

            let newObj = Object.assign({}, this.state, {
               popupShow: false,
            });
            this.setState(newObj);
         }
      });
   }
   handleCarStatusChange(e) {
      let current = e.target.dataset.status;
      let cid = parseInt(e.target.dataset.cid);
      let changedCid = this.state.carStatus.cid ? this.state.carStatus.cid : 0;
      let changedStatus = this.state.carStatus.status ? this.state.carStatus.status : '';
      let token = sessionStorage.getItem('token');
      const { dispatch } = this.props;
      let payload = {
         cid: false,
         status: false,
      };

      if (cid === changedCid) {
         if (current === changedStatus) {
            payload.status = current;
         } else {
            payload.status = changedStatus;
         }

         payload.cid = cid;
      } else {
         payload.cid = cid;
         payload.status = current;
      }
      axios.get(api.changeAdsStatus(payload.status, token, payload.cid)).then((res) => {
         if (res.data.status) {
            dispatch({
               type: type.CHANGE_ADS_STATUS,
               payload: payload,
            });
         }
      });
   }
   handleClosePopup(e) {
      let newObj = Object.assign({}, this.state, {
         popupShow: false,
      });
      this.setState(newObj);
   }
   handlePane(e) {
      let current = e.target.dataset.name;
      const { dispatch } = this.props;
      if (current === 'pending') {
         FetchPending(dispatch);

         this.setState(
            Object.assign({}, this.state, {
               tabpane: 'pending',
            })
         );
      } else {
         FetchAll(dispatch);
         this.setState(
            Object.assign({}, this.state, {
               tabpane: 'all',
            })
         );
      }
   }

   render() {
      const { ads } = this.props;

      let dateObj = new DateExtract();
      let pagenateCount = parseInt(ads.totData / ads.perPage) + (ads.totData % ads.perPage === 0 ? 0 : 1);
      let pagArray = [];
      for (let i = 0; i <= pagenateCount; i++) {
         if (i === 0) {
            continue;
         }
         pagArray.push(i);
      }

      return (
         <div>
            <DataTable>
               <DataTableHead title='All Ads' sub='Date 2021'>
                  <button className='btn btn-danger h-100 curve' style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: 1 }}>
                     CREATE AD
                  </button>
               </DataTableHead>

               <DataTableBody>
                  <div className='d-flex'>
                     <button
                        className='btn btn-primary rounded-0 m-1'
                        data-name='pending'
                        onClick={(e) => {
                           this.handlePane(e);
                        }}
                        style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: 1 }}
                     >
                        PENDING
                     </button>
                     <button
                        className='btn btn-success rounded-0 m-1'
                        data-name='all'
                        onClick={(e) => {
                           this.handlePane(e);
                        }}
                        style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: 1 }}
                     >
                        ALL
                     </button>
                  </div>
                  {this.state.tabpane === 'pending' ? (
                     <Pending />
                  ) : (
                     <Table>
                        <TableHead head='ID,User,Post,Approved,Model,Status,Action' />
                        <TableBody>
                           {ads.data.map((v) => {
                              const { cid, model, brand, date, status, uid, userName } = v;
                              return (
                                 <TableRaw key={cid}>
                                    <TableData>{cid}</TableData>
                                    <TableData>{userName === '0' ? 'unknown' : userName}</TableData>

                                    <TableData>{dateObj.humanReadbleDate(date, 'd-M-y', '/')}</TableData>
                                    <TableData>20/dec/2021</TableData>
                                    <TableData>
                                       <span style={{ marginRight: 5 }}>
                                          {model !== '0' ? model : 'unknown'}
                                          {' > '}
                                       </span>
                                       <span>{brand !== '0' ? brand : 'unknown'}</span>
                                    </TableData>
                                    <TableData>
                                       <div class='input-group ads-status-change'>
                                          <select
                                             class='form-select'
                                             name='carStatus'
                                             onChange={(e) => {
                                                this.setState(
                                                   Object.assign({}, this.state, {
                                                      carStatus: {
                                                         ...this.state.carStatus,
                                                         cid: cid,
                                                         status: e.target.value.toLowerCase(),
                                                      },
                                                   })
                                                );
                                             }}
                                          >
                                             <option defaultValue='pending' selected={status === 'pending' ? true : false}>
                                                Pending
                                             </option>
                                             <option defaultValue='active' selected={status === 'active' ? true : false}>
                                                Active
                                             </option>
                                             <option defaultValue='sold' selected={status === 'sold' ? true : false}>
                                                Sold
                                             </option>
                                             <option defaultValue='rejected' selected={status === 'rejected' ? true : false}>
                                                Rejected
                                             </option>
                                             <option defaultValue='deleted' selected={status === 'deleted' ? true : false}>
                                                Deleted
                                             </option>
                                          </select>
                                          <button
                                             class='btn'
                                             type='button'
                                             data-status={status.toLowerCase()}
                                             data-cid={cid}
                                             onClick={(e) => {
                                                this.handleCarStatusChange(e);
                                             }}
                                          >
                                             <ion-icon name='save-outline' data-cid={cid} data-status={status.toLowerCase()}></ion-icon>
                                          </button>
                                       </div>
                                    </TableData>
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
                                             <ion-icon name='eye-outline' data-cid={cid}></ion-icon>
                                          </button>
                                          <button
                                             type='button'
                                             class='btn'
                                             data-cid={cid}
                                             data-uid={uid}
                                             onClick={(e) => {
                                                this.handleCarEdit(e);
                                             }}
                                          >
                                             <ion-icon data-cid={cid} data-uid={uid} name='create-outline'></ion-icon>
                                          </button>
                                          <button
                                             type='button'
                                             class='btn'
                                             data-cid={cid}
                                             onClick={(e) => {
                                                this.handleCarDelete(e);
                                             }}
                                          >
                                             <ion-icon data-cid={cid} name='trash-outline'></ion-icon>
                                          </button>
                                       </div>
                                    </TableData>
                                 </TableRaw>
                              );
                           })}
                        </TableBody>
                     </Table>
                  )}
               </DataTableBody>

               <DataTableFooter>
                  <div className='row m-0 p-0 w-100 h-100'>
                     <div className='col-2 m-0 p-0 h-100 d-flex justify-content-center align-items-center'>
                        <span className='text-white' style={{ marginRight: 5 }}>
                           <b>Total</b> :
                        </span>
                        <span className='text-white'>{ads.totData}</span>
                     </div>
                     <div className='col-8 p-0 h-100 d-flex justify-content-center align-items-center'>
                        <ul className='pagination custome-pagination'>
                           <li className={'page-item ' + (ads.currentPage === 1 ? 'disabled' : '')}>
                              <button
                                 data-pageno={ads.currentPage <= ads.lastPage ? ads.currentPage - 1 : 1}
                                 onClick={(e) => {
                                    this.handlePaginationNumberClick(e);
                                 }}
                                 className='page-link'
                              >
                                 Previous
                              </button>
                           </li>
                           {pagArray.map((v) => {
                              return (
                                 <li className={'page-item ' + (ads.currentPage === v ? 'active' : '')} key={v}>
                                    <button
                                       class='page-link'
                                       data-pageno={v}
                                       onClick={(e) => {
                                          this.handlePaginationNumberClick(e);
                                       }}
                                    >
                                       {v}
                                    </button>
                                 </li>
                              );
                           })}

                           <li className={'page-item ' + (ads.currentPage === ads.lastPage ? 'disabled' : '')}>
                              <button
                                 data-pageno={ads.currentPage < ads.lastPage ? ads.currentPage + 1 : 1}
                                 onClick={(e) => {
                                    this.handlePaginationNumberClick(e);
                                 }}
                                 className='page-link'
                              >
                                 Next
                              </button>
                           </li>
                        </ul>
                     </div>
                     <div className='col-2 p-0 h-100 d-flex justify-content-center align-items-center'>
                        <span className='text-white' style={{ marginRight: 5 }}>
                           <b>Current</b> :
                        </span>
                        <span className='text-white'>{ads.currentData}</span>
                     </div>
                  </div>
               </DataTableFooter>
            </DataTable>

            {/*---------------- POPUP COMPONENT ---------------------*/}
            <PopUp show={this.state.popupShow} close={this.handleClosePopup} title='Are you sure?'>
               <div className='w-100 d-flex justify-content-center flex-column' style={{ minHeight: 200 }}>
                  <div className='p-2 d-flex flex-column text-white text-capitalize'>
                     <span className='mb-1'>CAR ID : #{this.state.delCarInfo.cid ? this.state.delCarInfo.cid : ''}</span>
                     <span>Do you really want to delete these records? This process cannot be undone.</span>
                  </div>
                  <div className='p-2 d-flex justify-content-center'>
                     <button
                        type='button'
                        class='btn btn-danger'
                        data-cid={this.state.delCarInfo.cid}
                        onClick={(e) => {
                           this.deleteCarApi(e);
                        }}
                     >
                        DELETE
                     </button>
                  </div>
               </div>
            </PopUp>

            {/*---------------- END POPUP COMPONENT ---------------------*/}
         </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
