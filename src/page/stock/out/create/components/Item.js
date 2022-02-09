import { Form } from 'react-bootstrap';

function Item() {
   return (
      <div className='invoice-item-input'>
         <div className='invoice-item-input-box' style={{ width: '40%' }}>
            <Form.Group controlId='formBasicEmail' className='w-100 position-relative'>
               <Form.Control type='text' data-type='name' />
            </Form.Group>
         </div>

         <div className='invoice-item-input-box' style={{ width: '10%' }}>
            <Form.Group controlId='formBasicEmail' className='w-100'>
               <Form.Control type='text' data-type='qty' />
            </Form.Group>
         </div>

         <div className='invoice-item-input-box' style={{ width: '15%' }}>
            <Form.Group controlId='formBasicEmail' className='w-100'>
               <Form.Control type='text' data-type='unit' />
            </Form.Group>
         </div>

         <div className='invoice-item-input-box' style={{ width: '15%' }}>
            <Form.Group controlId='formBasicEmail' className='w-100'>
               <Form.Control type='text' data-type='discount' />
            </Form.Group>
         </div>

         <div className='invoice-item-input-box' style={{ width: '15%' }}>
            <Form.Group controlId='formBasicEmail' className='w-100'>
               <Form.Control type='text' data-type='lineTotal' />
            </Form.Group>
         </div>
         <div className='invoice-item-input-box' style={{ width: '5%' }}>
            <button className='btn btn-dark shadow p-0' style={{ width: 60 }}>
               <span style={{ fontSize: 20 }}>
                  <ion-icon name='close'></ion-icon>
               </span>
            </button>
         </div>
      </div>
   );
}

export default Item;
