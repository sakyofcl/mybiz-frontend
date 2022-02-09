import React, { useEffect } from 'react';
import { Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import { Result, ResultItem, ResultText } from '../../../components/Result';
import { TopLoader } from '../../../components/Loader';
import Alert from '../../../components/Alert';
import { ActionButton } from '../../../components/ActionButton';
import CreateCustomer from '../../customers/CreateCustomer';
import { AddPayment } from './AddPayment';
//events
import { onChnageInvoiceItem } from './events/onChnageInvoiceItem';
import { fetchCustomerByName } from './events/fetchCustomerByName';
import { onClickSaveInvoice } from './events/onClickSaveInvoice';
//action
import { storeInvoiceCustomerInfo, storeInvoiceCustomers, storeInvoiceDate, storeInvoiceDiscount, storePaymentStatus, storeInvoiceRemark, addNewInvoiceItem, removeInvoiceItem, calculateInvoiceAmount } from '../../../redux/action/invoice';
import { hidePopup, showPopup } from '../../../redux/action/popup';
import { hideAlert } from '../../../redux/action/alert';
//constant
import { popupkey } from '../../../constant/popupkey';
import { loaderkey } from '../../../constant/loaderkey';
import { alertkey } from '../../../constant/alertkey';
//logic
import { getNextInvoiceNumber } from '../../../logic/invoice';
function CreateInvoice(props) {
   const dispatch = useDispatch();
   const { invoice, popup, loader, alert } = useSelector((state) => state);
   let totPaidAmount = 0;
   invoice.payment.map((v) => {
      totPaidAmount = parseFloat(totPaidAmount) + parseFloat(v.amount);
   });
   useEffect(() => {
      //call default cash customer;
      fetchCustomerByName('cash', dispatch, (res) => {
         if (res.data.data.length > 0) {
            storeInvoiceCustomerInfo(dispatch, { name: res.data.data[0].name, id: res.data.data[0].customer_id });
         } else {
            storeInvoiceCustomerInfo(dispatch, { name: '', id: '' });
         }
      });

      //fetch next invoice no
      getNextInvoiceNumber(dispatch);
   }, []);

   return (
      <div className='app-content'>
         <div className='w-100 h-100 p-2'>
            <div className='add-bill-wrapper'>
               <TopLoader state={loader.display[loaderkey.C_INVOICE_L]} />
               <div className='w-100'>
                  <Alert
                     state={alert.display[alertkey.C_INVOICE_ALERT]}
                     close={(e) => {
                        hideAlert(dispatch, alertkey.C_INVOICE_ALERT);
                     }}
                  />
               </div>
               <div className='invoice-details-wrapper'>
                  <div className='left-details d-flex flex-row'>
                     <div className='bill-to w-100'>
                        <div className='bill-to-head'>
                           <span className='invoice-to-message'>invoice to</span>
                        </div>

                        <div className='mb-2  d-flex'>
                           <div className='w-50 position-relative' style={{ marginRight: 10 }}>
                              <input
                                 type='text'
                                 className='form-control  rounded-0'
                                 value={invoice.customer.customer_name}
                                 onChange={(e) => {
                                    fetchCustomerByName(e.target.value ? e.target.value : '', dispatch, (res) => {
                                       if (res.data.data.length > 0) {
                                          storeInvoiceCustomers(dispatch, res.data.data);
                                          showPopup(dispatch, popupkey.V_CUSTOMER_FILTER_DATA);
                                       } else {
                                          storeInvoiceCustomers(dispatch, []);
                                          hidePopup(dispatch, popupkey.V_CUSTOMER_FILTER_DATA);
                                       }
                                    });
                                 }}
                                 placeholder='Name'
                              />
                              <div
                                 style={{
                                    position: 'absolute',
                                    top: 40,
                                    left: 0,
                                    zIndex: 2021,
                                 }}
                                 className={`bg-dark w-100 d-flex`}
                              >
                                 <Result
                                    title='Finded Customers :-'
                                    show={popup.display[popupkey.V_CUSTOMER_FILTER_DATA]}
                                    render={() => {
                                       return invoice.customer.filterData.map((v, i) => {
                                          return (
                                             <ResultItem
                                                eve={() => {
                                                   storeInvoiceCustomerInfo(dispatch, { name: v.name, id: v.customer_id });
                                                   hidePopup(dispatch, popupkey.V_CUSTOMER_FILTER_DATA);
                                                }}
                                                key={i}
                                             >
                                                <ResultText text={`${v.name}${v.address ? ' , ' + v.address : ''}${v.contact ? ' , ' + v.contact : ''}`} />
                                             </ResultItem>
                                          );
                                       });
                                    }}
                                 />
                              </div>
                           </div>

                           <ActionButton
                              text='ADD NEW'
                              click={(e) => {
                                 showPopup(dispatch, popupkey.C_CUSTOMER);
                              }}
                              cls='rounded-0 btn-danger'
                           />
                           <CreateCustomer />
                        </div>
                     </div>
                  </div>

                  <div className='right-details'>
                     <div className='bill-info'>
                        <div className='bill-info-head'>
                           <span className='invoice-to-message'>bill info</span>
                        </div>

                        <div className='d-flex flex-column align-items-end mb-2'>
                           <label className='form-label text-white' style={{ fontWeight: 500 }}>
                              Invoice No
                           </label>
                           <span className='badge invoice-no-badge'>#{invoice.next_invoice_no}</span>
                        </div>

                        <div className='d-flex flex-column align-items-end'>
                           <label for='exampleFormControlInput1' class='form-label text-white' style={{ fontWeight: 500 }}>
                              Date
                           </label>
                           <input
                              type='date'
                              className='form-control  rounded-0'
                              value={invoice.invoiceDate}
                              style={{ width: '50%' }}
                              onChange={(e) => {
                                 storeInvoiceDate(dispatch, e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               <div className='invoice-make-area-wrapper'>
                  <div className='invoice-make-head'>
                     <div className='invoice-make-head-item' style={{ width: '20%' }}>
                        <span className='bold'>Barcode</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '20%' }}>
                        <span className='bold'>Name</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '10%' }}>
                        <span className='bold'>Quantity</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '15%' }}>
                        <span className='bold'>Price</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '15%' }}>
                        <span className='bold'>Discount</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '15%' }}>
                        <span className='bold'>Line Total</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '5%' }}>
                        <span className='bold'>R</span>
                     </div>
                  </div>

                  {Object.keys(invoice.invoiceFeild).map((v, i) => {
                     let data = invoice.invoiceFeild[v];

                     return (
                        <div className='invoice-item-input' key={i}>
                           <div className='invoice-item-input-box' style={{ width: '20%' }}>
                              <Form.Group controlId='formBasicEmail' className='w-100 position-relative'>
                                 <Form.Control
                                    type='text'
                                    data-type='barcode'
                                    data-key={v}
                                    onChange={(e) => {
                                       onChnageInvoiceItem(e, dispatch);
                                    }}
                                 />
                              </Form.Group>
                           </div>

                           <div className='invoice-item-input-box' style={{ width: '20%' }}>
                              <Form.Group controlId='formBasicEmail' className='w-100 position-relative'>
                                 <Form.Control
                                    type='text'
                                    value={data.name}
                                    data-type='name'
                                    data-key={v}
                                    onChange={(e) => {
                                       onChnageInvoiceItem(e, dispatch);
                                    }}
                                 />
                              </Form.Group>
                           </div>

                           <div className='invoice-item-input-box' style={{ width: '10%' }}>
                              <Form.Group controlId='formBasicEmail' className='w-100'>
                                 <Form.Control
                                    type='text'
                                    value={data.qty}
                                    data-type='qty'
                                    data-key={v}
                                    onChange={(e) => {
                                       onChnageInvoiceItem(e, dispatch);
                                    }}
                                 />
                              </Form.Group>
                           </div>

                           <div className='invoice-item-input-box' style={{ width: '15%' }}>
                              <Form.Group controlId='formBasicEmail' className='w-100'>
                                 <Form.Control
                                    type='text'
                                    value={data.price}
                                    data-type='price'
                                    data-key={v}
                                    onChange={(e) => {
                                       onChnageInvoiceItem(e, dispatch);
                                    }}
                                 />
                              </Form.Group>
                           </div>

                           <div className='invoice-item-input-box' style={{ width: '15%' }}>
                              <Form.Group controlId='formBasicEmail' className='w-100'>
                                 <Form.Control
                                    type='text'
                                    value={data.discount}
                                    data-type='discount'
                                    data-key={v}
                                    onChange={(e) => {
                                       onChnageInvoiceItem(e, dispatch);
                                    }}
                                 />
                              </Form.Group>
                           </div>

                           <div className='invoice-item-input-box' style={{ width: '15%' }}>
                              <Form.Group controlId='formBasicEmail' className='w-100'>
                                 <Form.Control type='text' value={data.lineTotal} data-type='lineTotal' data-key={v} readOnly={true} />
                              </Form.Group>
                           </div>
                           <div className='invoice-item-input-box' style={{ width: '5%' }}>
                              <button
                                 className='btn btn-dark shadow p-0'
                                 style={{ width: 60 }}
                                 onClick={(e) => {
                                    removeInvoiceItem(dispatch, { key: v });
                                    calculateInvoiceAmount(dispatch, { key: 'total' });
                                    calculateInvoiceAmount(dispatch, { key: 'net' });
                                    calculateInvoiceAmount(dispatch, { key: 'balance' });
                                 }}
                              >
                                 <span style={{ fontSize: 20 }}>
                                    <ion-icon name='close'></ion-icon>
                                 </span>
                              </button>
                           </div>
                        </div>
                     );
                  })}
               </div>

               <div className='w-100 d-flex m-2'>
                  <button
                     className='btn btn-dark shadow p-0'
                     style={{ width: 60 }}
                     onClick={(e) => {
                        addNewInvoiceItem(dispatch);
                     }}
                  >
                     <span style={{ fontSize: 20 }}>
                        <ion-icon name='add'></ion-icon>
                     </span>
                  </button>
               </div>

               {/* Remark & Final Calculation  */}
               <div className='row p-3'>
                  <div className='col-6 d-flex flex-column'>
                     <FinalCalculationItem>
                        <div className='col-12 p-0 m-0'>
                           <div class='mb-2'>
                              <label className='form-label text-white'>
                                 <FinalCalculationTital text='remark 1' />
                              </label>
                              <textarea
                                 className='form-control bg-dark text-white border-dark'
                                 value={invoice.remark.one}
                                 onChange={(e) => {
                                    storeInvoiceRemark(dispatch, { key: 'one', value: e.target.value });
                                 }}
                                 rows='2'
                              ></textarea>
                           </div>
                        </div>
                        <div className='col-12 p-0 m-0'>
                           <div class='mb-2'>
                              <label className='form-label text-white'>
                                 <FinalCalculationTital text='remark 2' />
                              </label>
                              <textarea
                                 className='form-control bg-dark text-white border-dark'
                                 rows='2'
                                 value={invoice.remark.two}
                                 onChange={(e) => {
                                    storeInvoiceRemark(dispatch, { key: 'two', value: e.target.value });
                                 }}
                              ></textarea>
                           </div>
                        </div>
                     </FinalCalculationItem>
                  </div>
                  <div className='col-6 d-flex flex-column'>
                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='total' />
                        </div>
                        <div className='col-8 p-0 m-0'>
                           <FinalCalculationTextBox name='total' value={invoice.finalTotal.total} read={true} />
                        </div>
                     </FinalCalculationItem>

                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='Tot DISCOUNT' />
                        </div>
                        <div className='col-8 p-0 m-0 d-flex'>
                           <div className='w-50 d-flex'>
                              <FinalCalculationTextBox
                                 name='disPercentage'
                                 value={invoice.finalTotal.disPercentage}
                                 read={false}
                                 onChange={(e) => {
                                    let floatRegex = /^[+-]?(?:\d*\.)?\d+$/;
                                    let v = e.target.value === '' ? 0 : e.target.value;
                                    if (floatRegex.test(v)) {
                                       storeInvoiceDiscount(dispatch, {
                                          key: 'disPercentage',
                                          value: parseInt(v),
                                       });
                                       calculateInvoiceAmount(dispatch, { key: 'balance' });
                                    }
                                 }}
                              />
                              <div className='d-flex align-items-center h-100 text-white bg-dark' style={{ paddingLeft: 15, paddingRight: 15 }}>
                                 %
                              </div>
                           </div>
                           <div className='w-50'>
                              <FinalCalculationTextBox
                                 name='discount'
                                 read={false}
                                 value={invoice.finalTotal.discount}
                                 onChange={(e) => {
                                    let floatRegex = /^[+-]?(?:\d*\.)?\d+$/;
                                    let v = e.target.value === '' ? 0 : e.target.value;
                                    if (floatRegex.test(v)) {
                                       storeInvoiceDiscount(dispatch, {
                                          key: 'discount',
                                          value: parseFloat(v),
                                       });
                                       calculateInvoiceAmount(dispatch, { key: 'balance' });
                                    }
                                 }}
                              />
                           </div>
                        </div>
                     </FinalCalculationItem>

                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='net amount' />
                        </div>
                        <div className='col-8 p-0 m-0'>
                           <FinalCalculationTextBox name='net' read={true} value={invoice.finalTotal.net} />
                        </div>
                     </FinalCalculationItem>
                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='Paid Amount' />
                        </div>
                        <div className='col-8 p-0 m-0 d-flex'>
                           <FinalCalculationTextBox read={true} value={totPaidAmount} />
                           <ActionButton
                              text='ADD'
                              cls='rounded-0 btn-danger'
                              click={(e) => {
                                 showPopup(dispatch, popupkey.ADD_INVOICE_PAYMENT);
                              }}
                           />
                        </div>
                     </FinalCalculationItem>
                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='Balance Amount' />
                        </div>
                        <div className='col-8 p-0 m-0'>
                           <FinalCalculationTextBox read={true} value={invoice.finalTotal.balance} />
                        </div>
                     </FinalCalculationItem>
                  </div>
               </div>

               <Card className='auther-info border-0'>
                  <Card.Body className='d-flex p-3 mb-3 '>
                     <Form.Group controlId='formBasicEmail' className='w-25' style={{ paddingRight: 10 }}>
                        <Form.Label>Sales Ref</Form.Label>
                        <Form.Control type='text' data-name='salesRef' className='w-100' />
                     </Form.Group>
                  </Card.Body>
               </Card>

               <div className='d-flex justify-content-end'>
                  <button
                     className='btn btn-success invoice-action-btn'
                     data-type='save'
                     onClick={(e) => {
                        onClickSaveInvoice(e, dispatch, invoice);
                     }}
                  >
                     <span data-type='save' className={false ? 'd-none' : ''}>
                        Save
                     </span>
                     <span className={'spinner-border spinner-border-sm ' + (false ? '' : 'd-none')}></span>
                  </button>
               </div>
            </div>
         </div>

         {/*================================ [ POPUP COMPONENT ] ================================*/}
         <AddPayment />
      </div>
   );
}

function FinalCalculationTital(props) {
   return (
      <div className='w-100 h-100 text-white text-uppercase d-flex align-items-center' style={{ fontWeight: 'bold', letterSpacing: 2 }}>
         {props.text}
      </div>
   );
}

function FinalCalculationTextBox(props) {
   const { value, name, read, placeholder, onChange } = props;
   return <input type='text' data-name={name} class='form-control bg-dark rounded-0 text-white w-100 border-dark' value={value} readOnly={read} placeholder={placeholder} onChange={onChange} />;
}
FinalCalculationTextBox.defaultProps = {
   onChange: () => {},
};

function FinalCalculationItem(props) {
   return <div className='row w-100 m-0 p-0 mb-2'>{props.children}</div>;
}

export default CreateInvoice;
