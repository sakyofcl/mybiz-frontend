import type from '../../../../constant/type';
import { fetchProductInfo } from '../../../../logic/product';
import { storeInvoiceItem, setInvoiceFilterItem, calculateInvoiceAmount } from '../../../../redux/action/invoice';
// STORE INVOICE ITEMS
const onChnageInvoiceItem = (e, dispatch) => {
   let name = e.target.dataset.type;
   let key = e.target.dataset.key;
   let currentValue = e.target.value ? e.target.value : '';

   console.log(name);
   let validationState = true;
   let numberRegex = /^[0-9]+$/;
   let floatRegex = /^[+-]?(?:\d*\.)?\d+$/;

   switch (name) {
      case 'barcode':
         if (currentValue) {
            if (numberRegex.test(currentValue)) {
               fetchProductInfo('barcode', currentValue, 'sell_price,pid,name1,discount', (res) => {
                  if (res) {
                     setInvoiceFilterItem(dispatch, {
                        name: res.name1,
                        price: parseFloat(res.sell_price),
                        discount: parseFloat(res.discount),
                        pid: res.pid,
                        key: key,
                     });
                     calculateInvoiceAmount(dispatch, { key: 'total' });
                     calculateInvoiceAmount(dispatch, { key: 'net' });
                     calculateInvoiceAmount(dispatch, { key: 'balance' });
                  } else {
                     setInvoiceFilterItem(dispatch, {
                        name: '',
                        price: '',
                        discount: '',
                        pid: '',
                        key: key,
                     });
                  }
               });
            } else {
               validationState = false;
            }
         } else {
            currentValue = 0;
         }
         break;

      case 'qty':
         if (currentValue) {
            if (numberRegex.test(currentValue)) {
               currentValue = parseInt(currentValue) > 0 ? parseInt(currentValue) : 1;
            } else {
               validationState = false;
            }
         } else {
            currentValue = 1;
         }
         break;
      case 'price':
         if (currentValue) {
            if (floatRegex.test(currentValue)) {
               validationState = true;
               currentValue = parseFloat(currentValue);
            } else {
               validationState = false;
            }
         } else {
            currentValue = 0;
         }
         break;
      case 'discount':
         if (currentValue) {
            if (floatRegex.test(currentValue)) {
               validationState = true;
               currentValue = parseFloat(currentValue);
            } else {
               validationState = false;
            }
         } else {
            currentValue = 0;
         }
         break;
      case 'name':
         console.log(e);
         if (currentValue) {
            validationState = true;
         }

         break;

      default:
         break;
   }

   if (validationState) {
      storeInvoiceItem(dispatch, {
         name: name,
         key: key,
         value: currentValue,
      });
      calculateInvoiceAmount(dispatch, { key: 'total' });
      calculateInvoiceAmount(dispatch, { key: 'net' });
      calculateInvoiceAmount(dispatch, { key: 'balance' });
   } else {
      console.log('validation error.');
   }
};

export { onChnageInvoiceItem };
