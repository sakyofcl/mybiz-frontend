import { combineReducers } from 'redux';
import { nav } from './nav';
import { popup } from './popup';
import { sidenav } from './sidenav';
import { product } from './product';
import { category } from './category';
import { alert } from './alert';
import { location } from './location';
import { unit } from './unit';
import { stock } from './stock';
import { customer } from './customer';
import { invoice } from './invoice';
import { loader } from './loader';
import { deliverymode } from './deliverymode';
import { supplier } from './supplier';
import { receiver } from './receiver';
import { payment } from './payment';
import { customertype } from './customertype';
import { appmodule } from './appmodule';
import { user } from './user';
import { role } from './role';
import { auth } from './auth';
const root = combineReducers({
   nav: nav,
   popup: popup,
   sidenav: sidenav,
   product: product,
   category: category,
   alert: alert,
   location: location,
   unit: unit,
   customer: customer,
   stock: stock,
   invoice: invoice,
   loader: loader,
   deliverymode: deliverymode,
   supplier: supplier,
   receiver: receiver,
   payment: payment,
   customertype: customertype,
   appmodule: appmodule,
   user: user,
   role: role,
   auth: auth,
});

export default root;
