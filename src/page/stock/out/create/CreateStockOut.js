import { Form, Card } from 'react-bootstrap';

//component
import Alert from '../../../../components/Alert';
import Item from './components/Item';

function CreateStockOut(props) {
   return (
      <div className='app-content'>
         <div className='w-100 h-100 p-2'>
            <div className='add-bill-wrapper'>
               <div className='invoice-details-wrapper'>
                  <div className='left-details d-flex flex-row'>
                     <div className='bill-to w-50'>
                        <div className='bill-to-head'>
                           <span className='invoice-to-message'>invoice to</span>
                        </div>

                        <div className='mb-2 position-relative'>
                           <input type='text' class='form-control w-75 rounded-0' placeholder='Short code' />
                        </div>

                        <div className='mb-2'>
                           <input type='text' class='form-control w-75 rounded-0' placeholder='Name' />
                        </div>

                        <div className='mb-2'>
                           <input type='text' class='form-control w-75 rounded-0' placeholder='Position' />
                        </div>

                        <div className='mb-2'>
                           <input type='text' class='form-control w-75 rounded-0' placeholder='Company' />
                        </div>

                        <div className='mb-2'>
                           <input type='text' class='form-control w-75 rounded-0' placeholder='Address' />
                        </div>

                        <div className='mb-2 position-relative'>
                           <input type='text' class='form-control w-75 rounded-0' placeholder='Contact Number' />
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
                           <span className='badge invoice-no-badge'>#</span>
                        </div>

                        <div className='d-flex flex-column align-items-end'>
                           <label for='exampleFormControlInput1' class='form-label text-white' style={{ fontWeight: 500 }}>
                              Date
                           </label>
                           <input type='date' className='form-control  rounded-0' style={{ width: '50%' }} />
                        </div>
                     </div>
                  </div>
               </div>

               <div className='invoice-make-area-wrapper'>
                  <div className='invoice-make-head'>
                     <div className='invoice-make-head-item' style={{ width: '40%' }}>
                        <span className='bold'>Product</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '10%' }}>
                        <span className='bold'>Qty</span>
                     </div>

                     <div className='invoice-make-head-item' style={{ width: '15%' }}>
                        <span className='bold'>Unit Rate</span>
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

                  <Item />
               </div>

               <div className='w-100 d-flex m-2'>
                  <button className='btn btn-dark shadow p-0' style={{ width: 60 }}>
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
                                 <FinalCalculationTital text='remark' />
                              </label>
                              <textarea className='form-control bg-dark text-white border-dark' rows='2'></textarea>
                           </div>
                        </div>
                     </FinalCalculationItem>
                     <FinalCalculationItem>
                        <div className='col-12 p-0 m-0'>
                           <div class='mb-2'>
                              <label className='form-label text-white'>
                                 <FinalCalculationTital text='payment method' />
                              </label>
                              <div className='d-flex'>
                                 <div className='d-flex justify-content-center align-items-center' style={{ marginRight: 40 }}>
                                    <input className='form-check-input mt-0' type='radio' data-name='cash' defaultValue='cash' name='payment_method' id='cash' />
                                    <label for='cash' className='text-white' style={{ marginLeft: 10 }}>
                                       Cash
                                    </label>
                                 </div>
                                 <div className='d-flex justify-content-center align-items-center' style={{ marginRight: 40 }}>
                                    <input className='form-check-input mt-0' type='radio' data-name='credit' defaultValue='credit' name='payment_method' id='credit' />
                                    <label for='credit' className='text-white' style={{ marginLeft: 10 }}>
                                       Credit
                                    </label>
                                 </div>
                                 <div className='d-flex justify-content-center align-items-center'>
                                    <input className='form-check-input mt-0' type='radio' data-name='card' defaultValue='card' name='payment_method' id='card' />
                                    <label for='card' className='text-white' style={{ marginLeft: 10 }}>
                                       Card
                                    </label>
                                 </div>
                              </div>
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
                           <FinalCalculationTextBox name='total' read={true} />
                        </div>
                     </FinalCalculationItem>

                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='vat' />
                        </div>
                        <div className='col-8 p-0 m-0'>
                           <FinalCalculationTextBox name='vat' read={false} />
                        </div>
                     </FinalCalculationItem>

                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='Tot DISCOUNT' />
                        </div>
                        <div className='col-8 p-0 m-0 d-flex'>
                           <div className='w-50 d-flex'>
                              <FinalCalculationTextBox name='disPercentage' read={false} />
                              <div className='d-flex align-items-center h-100 text-white bg-dark' style={{ paddingLeft: 15, paddingRight: 15 }}>
                                 %
                              </div>
                           </div>
                           <div className='w-50'>
                              <FinalCalculationTextBox name='discount' read={false} />
                           </div>
                        </div>
                     </FinalCalculationItem>

                     <FinalCalculationItem>
                        <div className='col-4 p-0 m-0'>
                           <FinalCalculationTital text='net amount' />
                        </div>
                        <div className='col-8 p-0 m-0'>
                           <FinalCalculationTextBox name='net' read={true} />
                        </div>
                     </FinalCalculationItem>
                  </div>
               </div>

               <Card className='auther-info border-0'>
                  <Card.Body className='d-flex p-3 mb-3 '>
                     <Form.Group controlId='formBasicEmail' className='w-25' style={{ paddingRight: 10 }}>
                        <Form.Label>Created by</Form.Label>
                        <Form.Control type='text' data-name='auther' className='w-100' />
                     </Form.Group>
                     <Form.Group controlId='formBasicEmail' className='w-25' style={{ paddingRight: 10 }}>
                        <Form.Label>Sales Ref</Form.Label>
                        <Form.Control type='text' data-name='salesRef' className='w-100' />
                     </Form.Group>
                  </Card.Body>
               </Card>

               <Card className='payment-info border-0'>
                  <Card.Body className='d-flex p-3 flex-column'>
                     <div className='d-flex mb-3 align-items-center'>
                        <span className='text-white' style={{ marginRight: 10 }}>
                           Payment Status :
                        </span>

                        <label for='paid' className='text-white' style={{ marginRight: 10 }}>
                           Paid :
                        </label>
                        <input className='form-check-input mt-0' type='radio' data-name='paid' defaultValue='1' name='payment_paid' id='paid' style={{ marginRight: 10 }} />

                        <label for='unpaid' className='text-white' style={{ marginRight: 10 }}>
                           Unpaid :
                        </label>
                        <input className='form-check-input mt-0' type='radio' data-name='paid' defaultValue='0' id='unpaid' name='payment_paid' />
                     </div>
                  </Card.Body>
               </Card>

               <div className='d-flex justify-content-between'>
                  <button className='btn btn-success invoice-action-btn' data-type='save'>
                     <span data-type='save' className={false ? 'd-none' : ''}>
                        Save
                     </span>
                     <span className={'spinner-border spinner-border-sm ' + (false ? '' : 'd-none')}></span>
                  </button>

                  <button className='btn btn-primary invoice-action-btn' data-type='new'>
                     <span data-type='new' className={false ? 'd-none' : ''}>
                        New
                     </span>
                     <span className={'spinner-border spinner-border-sm ' + (false ? '' : 'd-none')}></span>
                  </button>
               </div>
            </div>
         </div>
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

export default CreateStockOut;
