//const appUrl = 'http://127.0.0.1:8000';
const appUrl = 'https://api.mybiz.royaltech.lk';

const api = {
   //PRODUCT
   readProduct: '/product',
   createProduct: '/product/create',
   updateProduct: '/product/update',
   deleteProduct: '/product/delete',
   readProductInfo: '/product/info',
   readProductBarcode: '/product/barcode',
   //CATEGORY
   createCategory: '/category/create',
   readCategory: '/category',
   readCategoryGroup: '/category/group',
   //SUB CATEGORY
   createSubCategory: '/subcategory/create',
   //PRODUCT LOCATION
   readLocation: '/productlocation',
   // PRODUCT UNIT
   readUnit: '/productunit',
   //STOCK
   readStockIn: '/stock/in',
   createStockIn: '/stock/in/create',
   readStockOut: '/stock/out',
   //CUSTOMER
   readCustomer: '/customer',
   searchCustomers: '/customer/search',
   createCustomer: '/customer/create',
   //INVOICE
   readInvoice: '/invoice',
   createInvoice: '/invoice/create',
   readNextInvoiceNo: '/invoice/next/number',
   //DELIVERY MODE
   readDeliveryMode: '/deliverymode',
   //SUPPLIER
   readSupplier: '/supplier',
   //RECEIVER
   readReceiver: '/receiver',
   //PAYMENTS
   readPayments: '/payments',
   addPayment: '/payment/add',
   //SALES REF
   readSalesRef: '/sales/ref',
};

//applay url name
Object.keys(api).map((v) => {
   api[v] = appUrl + api[v];
});
export { appUrl };

export default api;
