import type from '../../constant/type';
import clone from './cloneObject';
import {invoiceData} from '../../dummy/data';

//get today date
const currentDate=new Date();
const defaultDate=currentDate.getMonth()+"-"+String(currentDate.getDate()).padStart(2,'0')+"-"+currentDate.getFullYear();


let store = {
    data:invoiceData,
    invoiceInfo:{
        info:{
            name:false,
            company:false,
            location:false,
            invoiceNo:false,
            invoiceDate:false,
            subTot:false,
            adjustment:false,
            tot:false,
            auther:false,
            paid:true
        }
        ,
        item:[]
    },
    createIvoice:{
        invoiceFeild:[
            {key:1,},{key:2},{key:3},{key:4},{key:5}
        ],
        invoiceItem:[],
        customerDetail:{
            name:false,
            company:false,
            place:false,
            short_code:false,
        },
        auther:"unknown",
        invoiceDate:defaultDate,
        inoiceNo:Math.floor(100000 + Math.random() * 900000)
    }
    ,
    invoiceValue:{
        data:false
    }
    
};

const invoiceStore = (state = store, action) => {
    const { 
        SAVE_INVOICE_DATA,
        CHANGE_PAYMENT_STATUS,
        DELETE_INVOICE,
        STORE_CUSTOMER_DATA,
        STORE_INVOICE_DATE,
        STORE_AUTHER_DATA,
        STORE_INVOICE_ITEM,
        SAVE_INVOICE
    }=type;
    
    let newObj = clone(state);
    switch (action.type) {
        case SAVE_INVOICE_DATA:
            newObj.data= action.payload.data;
            return newObj
        
        case CHANGE_PAYMENT_STATUS:
            const {index,paid}=action.payload
            newObj.data[index].payment_status=paid;
            console.log('redux update');
            return newObj;
        case DELETE_INVOICE:
            let id=action.payload.id;
            let newData=newObj.data.filter(item => item.invoice_no !== id);
            newObj.data=newData;
            return newObj;
        case STORE_CUSTOMER_DATA:
            let customerData=action.payload;
            const {name,company,place,short_code}=state.createIvoice.customerDetail;
            
            
            newObj.createIvoice.customerDetail={
                name:customerData.name?customerData.name:name,
                company:customerData.company?customerData.company:company,
                place:customerData.place?customerData.place:place,
                short_code:customerData.short_code?customerData.short_code:short_code,
            }
            

            return newObj;
        case STORE_INVOICE_DATE:
            let invoiceDate=action.payload.date;
            newObj.createIvoice.invoiceDate=invoiceDate;
            return newObj;
        case STORE_AUTHER_DATA:
            let autherData=action.payload.auther;
            
            if(autherData){
                newObj.createIvoice.auther=autherData;
            }
            else{
                newObj.createIvoice.auther="unknown";
            }

            
            return newObj;
        case STORE_INVOICE_ITEM:
            let storeValue=action.payload;
            if(action.isNew){
                newObj.createIvoice.invoiceItem.push({
                    key:storeValue.key,
                    data:{
                        name:storeValue.name,
                        qty:storeValue.qty,
                        unit:storeValue.unit
                    }
                })
            }
            else{
                newObj.createIvoice.invoiceItem[action.pos]={
                    key:storeValue.key,
                    data:{
                        name:storeValue.name,
                        qty:storeValue.qty,
                        unit:storeValue.unit
                    }
                }
            }
            return newObj;
        case SAVE_INVOICE:
            let snapShot=action.payload.data;
            newObj.invoiceValue.data=snapShot;
            return newObj;
        default:
            return state;
    }
};

export { invoiceStore };
