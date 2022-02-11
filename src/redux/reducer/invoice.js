import type from '../../constant/type';
import { ChangeState } from '../../lib/ChangeState';
import { calculateLineTotal, calculateInvoiceTotal, calculateNetAmount, calculateInvoiceDiscount, calculateTotalPaidAmount } from '../../logic/invoice';
let store = {
   data: [],
   totData: 0,
   currentData: 0,
   perPage: 1,
   currentPage: 1,
   lastPage: 1,
   fetchData: false,
   dataSummary: {
      total_invoice: 0,
      total_amount: 0,
      total_balance: 0,
      total_paid: 0,
   },

   invoiceFeild: {
      key1: {
         pid: '',
         name: '',
         qty: '',
         price: '',
         discount: '',
         lineTotal: '',
         suggest: false,
         barcode: '',
      },
      key2: {
         pid: '',
         name: '',
         qty: '',
         price: '',
         discount: '',
         lineTotal: '',
         suggest: false,
         barcode: '',
      },
      key3: {
         pid: '',
         name: '',
         qty: '',
         price: '',
         discount: '',
         lineTotal: '',
         suggest: false,
         barcode: '',
      },
      key4: {
         pid: '',
         name: '',
         qty: '',
         price: '',
         discount: '',
         lineTotal: '',
         suggest: false,
         barcode: '',
      },
      key5: {
         pid: '',
         name: '',
         qty: '',
         price: '',
         discount: '',
         lineTotal: '',
         suggest: false,
         barcode: '',
      },
   },
   customer: {
      filterData: [],
      customer_id: '',
      customer_name: '',
   },
   invoiceDate: new Date().toISOString().substring(0, 10),
   filterProduct: [],
   finalTotal: {
      total: 0,
      net: 0,
      discount: 0,
      discountType: '%',
      disPercentage: 0,
      balance: 0,
   },
   payment: [],
   payment_status: '0',
   remark: {
      one: '',
      two: '',
   },
   next_invoice_no: '',
   sales_ref: '',
   fetchSalesRef: [],
};

const invoice = (state = store, action) => {
   const { STORE_FETCH_SALES_REF, STORE_SALES_REF, STORE_INVOICE, STORE_INVOICE_CUSTOMERS, STORE_INVOICE_CUSTOMER_INFO, STORE_INVOICE_DATE, STORE_INVOICE_ITEM, SET_FILTER_INVOICE_DATA, STORE_INVOICE_DISCOUNT, CALCULATE_INVOICE_AMOUNTS, RESET_INVOICE, STORE_PAYMENT_STATUS, STORE_INVOICE_REMARK, ADD_NEW_INVOICE_ITEM, REMOVE_INVOICE_ITEM, STORE_INVOICE_PAYMENT, REMOVE_INVOICE_PAYMENT, STORE_NEXT_INVOICE_NO } = type;

   switch (action.type) {
      case STORE_INVOICE:
         return ChangeState(state, {
            data: action.payload.data,
            totData: action.payload.totData,
            currentData: action.payload.currentData,
            perPage: action.payload.perPage,
            currentPage: action.payload.currentPage,
            lastPage: action.payload.lastPage,
            fetchData: action.payload.fetchData,
            dataSummary: action.payload.dataSummary,
         });
      case STORE_INVOICE_CUSTOMERS: {
         const { data } = action.payload;
         return ChangeState(state, {
            customer: {
               ...state.customer,
               filterData: data,
            },
         });
      }
      case STORE_INVOICE_CUSTOMER_INFO: {
         const { data } = action.payload;
         return ChangeState(state, {
            customer: {
               ...state.customer,
               customer_id: 'id' in data ? data.id : state.customer.customer_id,
               customer_name: 'name' in data ? data.name : state.customer.customer_name,
            },
         });
      }

      case STORE_INVOICE_DATE: {
         const { date } = action.payload;
         return ChangeState(state, {
            invoiceDate: date,
         });
      }

      case STORE_INVOICE_ITEM: {
         let {
            data: { name, value, key },
         } = action.payload;

         const prevQty = state.invoiceFeild[key].qty === '' || state.invoiceFeild[key].qty === 0 ? 1 : state.invoiceFeild[key].qty;
         const prevPrice = state.invoiceFeild[key].price === '' ? 0 : state.invoiceFeild[key].price;
         const prevDiscount = state.invoiceFeild[key].discount === '' ? 0 : state.invoiceFeild[key].discount;

         let targetChangeObjectName = '';
         let lineTotal = false;

         switch (name) {
            case 'barcode':
               targetChangeObjectName = 'barcode';
               lineTotal = false;
               break;
            case 'name':
               targetChangeObjectName = 'name';
               lineTotal = false;
               break;
            case 'qty':
               targetChangeObjectName = 'qty';
               lineTotal = calculateLineTotal(value, prevPrice, prevDiscount);
               break;
            case 'price': {
               targetChangeObjectName = 'price';
               let v = value ? parseFloat(value) : 0;
               if (v >= prevDiscount) {
                  lineTotal = calculateLineTotal(prevQty, value, prevDiscount);
               } else {
                  lineTotal = calculateLineTotal(prevQty, prevDiscount, prevDiscount);
                  value = prevDiscount;
               }

               break;
            }

            case 'discount': {
               targetChangeObjectName = 'discount';
               let v = value ? parseFloat(value) : 0;
               if (prevPrice >= v) {
                  lineTotal = calculateLineTotal(prevQty, prevPrice, value);
               } else {
                  lineTotal = calculateLineTotal(prevQty, prevPrice, prevPrice);
                  value = prevPrice;
               }
               break;
            }

            default:
               break;
         }

         return ChangeState(state, {
            invoiceFeild: {
               ...state.invoiceFeild,
               [key]: {
                  ...state.invoiceFeild[key],
                  [targetChangeObjectName]: value,
                  lineTotal: lineTotal === false ? state.invoiceFeild[key].lineTotal : lineTotal,
               },
            },
         });
      }
      case SET_FILTER_INVOICE_DATA: {
         const { name, pid, price, discount, key } = action.payload;
         return ChangeState(state, {
            invoiceFeild: {
               ...state.invoiceFeild,
               [key]: {
                  ...state.invoiceFeild[key],
                  price: price,
                  name: name,
                  pid: pid,
                  discount: discount,
                  qty: 1,
                  lineTotal: calculateLineTotal(1, price, discount),
               },
            },
         });
      }
      case STORE_INVOICE_DISCOUNT: {
         let { key, value } = action.payload;
         const tot = calculateInvoiceTotal(state.invoiceFeild);

         switch (key) {
            case 'discount': {
               let v = value ? parseFloat(value) : 0;
               if (tot >= v) {
                  v = value;
               } else {
                  v = tot;
               }

               return ChangeState(state, {
                  finalTotal: {
                     ...state.finalTotal,
                     discount: v,
                     net: calculateNetAmount(tot, v),
                     disPercentage: 0,
                  },
               });
            }

            case 'disPercentage': {
               let v = value ? parseFloat(value) : 0;

               if (100 >= v) {
                  v = value;
               } else {
                  v = 100;
               }
               console.log(v);
               return ChangeState(state, {
                  finalTotal: {
                     ...state.finalTotal,
                     discount: calculateInvoiceDiscount(v, tot),
                     net: calculateNetAmount(tot, calculateInvoiceDiscount(v, tot)),
                     disPercentage: v,
                  },
               });
            }

            default:
               return state;
         }
      }
      case CALCULATE_INVOICE_AMOUNTS: {
         const { key } = action.payload;
         const tot = calculateInvoiceTotal(state.invoiceFeild);
         const net = calculateNetAmount(tot, state.finalTotal.discount);
         const totPaid = calculateTotalPaidAmount(state.payment);
         let balance = net >= totPaid ? net - totPaid : 0;

         switch (key) {
            case 'total':
               return ChangeState(state, {
                  finalTotal: {
                     ...state.finalTotal,
                     total: tot,
                  },
               });

            case 'net':
               return ChangeState(state, {
                  finalTotal: {
                     ...state.finalTotal,
                     net: net,
                  },
               });
            case 'balance':
               return ChangeState(state, {
                  finalTotal: {
                     ...state.finalTotal,
                     balance: balance,
                  },
               });

            default:
               return state;
         }
      }

      case RESET_INVOICE: {
         return ChangeState(state, store);
      }
      case STORE_PAYMENT_STATUS: {
         const { payment_status } = action.payload;
         return ChangeState(state, {
            payment_status: payment_status,
         });
      }
      case STORE_INVOICE_REMARK: {
         const { key, value } = action.payload;
         return ChangeState(state, {
            remark: {
               ...state.remark,
               [key]: value,
            },
         });
      }
      case ADD_NEW_INVOICE_ITEM: {
         const currentKeyCount = Object.keys(state.invoiceFeild).length;
         return ChangeState(state, {
            invoiceFeild: {
               ...state.invoiceFeild,
               [`key${currentKeyCount + 1}`]: {
                  pid: '',
                  name: '',
                  qty: '',
                  price: '',
                  discount: '',
                  lineTotal: '',
                  suggest: false,
               },
            },
         });
      }

      case REMOVE_INVOICE_ITEM: {
         const removeKey = action.payload.key;
         let finalFeild = state.invoiceFeild;
         if (state.invoiceFeild[removeKey] !== undefined) {
            delete finalFeild[removeKey];
         }
         return ChangeState(state, {
            invoiceFeild: finalFeild,
         });
      }
      case STORE_INVOICE_PAYMENT: {
         const { data } = action.payload;
         let prevData = state.payment;
         prevData.push(data);
         return ChangeState(state, {
            payment: prevData,
         });
      }
      case REMOVE_INVOICE_PAYMENT: {
         const { key } = action.payload;
         let prevData = state.payment;
         prevData.splice(key, 1);
         return ChangeState(state, {
            payment: prevData,
         });
      }

      case STORE_NEXT_INVOICE_NO: {
         const { no } = action.payload;
         return ChangeState(state, {
            next_invoice_no: no,
         });
      }
      case STORE_SALES_REF: {
         const { data } = action.payload;
         return ChangeState(state, {
            sales_ref: data,
         });
      }

      case STORE_FETCH_SALES_REF: {
         const { data } = action.payload;
         return ChangeState(state, {
            fetchSalesRef: data,
         });
      }

      default:
         return state;
   }
};

export { invoice };
