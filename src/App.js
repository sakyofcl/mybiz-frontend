import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

//componentes
import AppLayout from './components/AppLayout';
import Private from './components/Private';
//logic
import { getModuleGroup } from './logic/appmodule';

//pages
//=================== [ STOCK MODULE ] ===================\\
import CreateStockOut from './page/stock/out/create/CreateStockOut';
import StockOut from './page/stock/StockOut';
import StockIn from './page/stock/StockIn';
//=================== [ INVOICE MODULE ] ===================\\
import Invoice from './page/invoice/Invoice';
import CreateInvoice from './page/invoice/create/CreateInvoice';

import Products from './page/products/Products';
import Sales from './page/sales/Sales';
import SalesItem from './page/sales/SalesItem';
import Customers from './page/customers/Customers';
import Category from './page/category/Category';
import Location from './page/location/Location';
import Dashboard from './page/dashboard/Dashboard';
import Reportes from './page/reportes/Reportes';
import Payments from './page/payments/Payments';
import Expenses from './page/account/Expenses';
import Purchasing from './page/account/Purchasing';
import Settings from './page/settings/Settings';
import User from './page/user/User';
import Login from './page/auth/Login';
import Logout from './page/auth/Logout';
function App() {
   const { auth,appmodule } = useSelector((state) => state);
   const dispatch = useDispatch();
   useEffect(()=>{
      getModuleGroup(dispatch, appmodule.dataFetched);
   },[])

   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<AppLayout />}>
               <Route index element={<Private ele={Dashboard} />} />
               <Route path='products' element={<Private ele={Products} />} />
               <Route path='categories' element={<Private ele={Category} />} />
               <Route path='locations' element={<Private ele={Location} />} />

               <Route path='stock/in' element={<Private ele={StockIn} />} />
               <Route path='stock/out' element={<Private ele={StockOut} />} />

               <Route path='invoice' element={<Private ele={Invoice} />} />
               <Route path='invoice/create' element={<Private ele={CreateInvoice} />} />

               <Route path='sales' element={<Private ele={Sales} />} />
               <Route path='sales/item' element={<Private ele={SalesItem} />} />

               <Route path='customers' element={<Private ele={Customers} />} />

               <Route path='payments' element={<Private ele={Payments} />} />

               <Route path='reportes' element={<Private ele={Reportes} />} />

               <Route path='settings' element={<Private ele={Settings} />} />

               <Route path='user' element={<Private ele={User} />} />

               <Route path='account/expenses' element={<Private ele={Expenses} />} />
               <Route path='account/purchasing' element={<Private ele={Purchasing} />} />
            </Route>

            <Route path='/login' element={auth.isOk ? <Navigate to='/' /> : <Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<span>404</span>} />
         </Routes>
      </BrowserRouter>
   );
}

const mapStateToProps = (state) => {
   return {
      auth: state.auth,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      dispatch: dispatch,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
