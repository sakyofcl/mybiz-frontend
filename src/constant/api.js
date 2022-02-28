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
   deleteCategory: '/category/delete',
   updateCategory: '/category/update',
   //SUB CATEGORY
   createSubCategory: '/subcategory/create',
   deleteSubCategory: '/subcategory/delete',
   updateSubCategory: '/subcategory/update',
   //PRODUCT LOCATION
   readLocation: '/productlocation',
   deleteLocation: '/productlocation/delete',
   updateLocation: '/productlocation/update',
   createLocation: '/productlocation/create',
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
   deleteCustomer: '/customer/delete',
   updateCustomer: '/customer/update',

   //CUSTOMER TYPE
   readCustomerType: '/customertype',
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
   //MODULE
   readModuleGroup: '/module/group',
   //USER
   readUser: '/user',
   updateUser: '/user/update',
   createUser: '/user/create',
   deleteUser: '/user/delete',
   //ROLE
   readRole: '/role',
   //AUTH
   authLogin: '/login',
};

//applay url name
Object.keys(api).map((v) => {
   api[v] = appUrl + api[v];
});
export { appUrl };

export default api;
