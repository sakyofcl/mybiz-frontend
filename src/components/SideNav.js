import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

//component
import AccessDenied from './AccessDenied';
//assets image
import logo from '../assets/img/logo.png';
//constant
import { popupkey } from '../constant/popupkey';
//logic
import { getModuleGroup } from '../logic/appmodule';
//lib
import { ChangeState } from '../lib/ChangeState';
//action
import { showPopup } from '../redux/action/popup';

function SideNav() {
   const { appmodule } = useSelector((state) => state);

   let sidenav = {
      products: [
         { text: 'Products', to: '/products', allow: checkAllow(appmodule.data, 15) },
         { text: 'Categories', to: '/categories', allow: checkAllow(appmodule.data, 16) },
         { text: 'Locations', to: '/locations', allow: checkAllow(appmodule.data, 17) },
      ],
      stock: [
         { text: 'Stock In', to: '/stock/in', allow: checkAllow(appmodule.data, 18) },
         { text: 'Stock Out', to: '/stock/out', allow: checkAllow(appmodule.data, 19) },
      ],
      accounts: [
         { text: 'Expenses', to: 'account/expenses', allow: checkAllow(appmodule.data, 20) },
         { text: 'Purchasings', to: 'account/purchasing', allow: checkAllow(appmodule.data, 21) },
      ],
   };

   return (
      <div className='side-nav-container'>
         <div className='app-logo uncopy'>
            <img src={logo} alt='app logo' className='uncopy' />
         </div>
         <div className='nav-icon-wrapper'>
            <SideNavMenu ico='apps-outline' text='Dashboard' to='/' allow={checkAllow(appmodule.data, 9)} />
            <SideNavMenu ico='document-text-outline' text='Reports' to='/reportes' allow={checkAllow(appmodule.data, 12)} />
            <SideNavMenu ico='storefront-outline' text='Store' submenu={sidenav.products} />
            <SideNavMenu ico='repeat-outline' text='Stock' submenu={sidenav.stock} />
            <SideNavMenu ico='newspaper-outline' text='invoices' to='/invoice' allow={checkAllow(appmodule.data, 1)} />
            <SideNavMenu ico='cash-outline' text='Payments' to='/payments' allow={checkAllow(appmodule.data, 2)} />
            <SideNavMenu ico='people-outline' text='customers' to='/customers' allow={checkAllow(appmodule.data, 8)} />
            <SideNavMenu ico='book-outline' text='Accounts' submenu={sidenav.accounts} />
            <Divider />
            <SideNavMenu ico='settings-outline' text='settings' to='/settings' />
            <SideNavMenu ico='person-outline' text='user' to='/user' allow={checkAllow(appmodule.data, 23)} />
            <SideNavMenu ico='exit-outline' text='logout' to='/logout' />
         </div>
         <AccessDenied displayKey={popupkey.COMMON_ACCESS_DENIED} />
      </div>
   );
}

class Divider extends React.Component {
   render() {
      return <div className='nav-divider'></div>;
   }
}

function SideNavMenu(props) {
   const dispatch = useDispatch();
   const { appmodule } = useSelector((state) => state);
   const [state, setState] = useState({ show: false, mainAllow: false });
   const { submenu, to, text, ico, key, module, denied, click, allow } = props;

   let mainActiveEve = ({ isActive }) => (isActive ? 'side-nav-menu-head active' : 'side-nav-menu-head');
   let subActiveEve = ({ isActive }) => (isActive ? 'side-nav-menu-body-item active' : 'side-nav-menu-body-item');

   if (submenu.length > 0) {
      return (
         <div className='side-nav-menu-wrapper' key={key}>
            <SideNavMain
               to={to}
               text={text}
               ico={ico}
               show={state.show}
               isActive={mainActiveEve}
               click={(e) => {
                  setState({ show: state.show ? false : true });
               }}
            />

            <div className={`side-nav-menu-body ${state.show ? 'show' : 'hide'}`}>
               {submenu.map((v, i) => {
                  return v.allow ? (
                     <NavLink to={`${to ? to : ''}${v.to}`} className={subActiveEve} key={i}>
                        <span className='uncopy'>{v.text}</span>
                     </NavLink>
                  ) : (
                     <div
                        className='side-nav-menu-body-item'
                        key={i}
                        onClick={(e) => {
                           showPopup(dispatch, popupkey.COMMON_ACCESS_DENIED);
                        }}
                     >
                        <span className='uncopy'>{v.text}</span>
                     </div>
                  );
               })}
            </div>
         </div>
      );
   } else {
      return allow ? (
         <div className='side-nav-menu-wrapper' key={key}>
            <NavLink to={to} className={mainActiveEve}>
               <div className='side-nav-menu-info'>
                  <ion-icon name={ico}></ion-icon>
                  <span className='uncopy'>{text}</span>
               </div>
            </NavLink>
         </div>
      ) : (
         <div className='side-nav-menu-wrapper' key={key}>
            <div
               className='side-nav-menu-head'
               onClick={(e) => {
                  showPopup(dispatch, popupkey.COMMON_ACCESS_DENIED);
               }}
            >
               <div className='side-nav-menu-info'>
                  <ion-icon name={ico}></ion-icon>
                  <span className='uncopy'>{text}</span>
               </div>
            </div>
         </div>
      );
   }
}

function SideNavMain(props) {
   const { to, text, ico, show, click, isActive } = props;
   if (to) {
      return (
         <NavLink to={to} className={isActive} onClick={click}>
            <div className='side-nav-menu-info'>
               <ion-icon name={ico}></ion-icon>
               <span className='uncopy'>{text}</span>
            </div>
            <div className='side-nav-menu-icon'>
               <ion-icon name={show ? 'chevron-down-outline' : 'chevron-forward-outline'}></ion-icon>
            </div>
         </NavLink>
      );
   } else {
      return (
         <div className='side-nav-menu-head' onClick={click}>
            <div className='side-nav-menu-info'>
               <ion-icon name={ico}></ion-icon>
               <span className='uncopy'>{text}</span>
            </div>
            <div className='side-nav-menu-icon'>
               <ion-icon name={show ? 'chevron-down-outline' : 'chevron-forward-outline'}></ion-icon>
            </div>
         </div>
      );
   }
}
SideNavMenu.defaultProps = {
   submenu: [].length,
   click: (e) => {},
   denied: (e) => {},
   allow: true,
};
SideNavMain.defaultProps = {
   show: false,
   isActive: () => {
      return '';
   },
   click: () => {},
};
const mapStateToProps = (state) => {
   return {
      nav: state.nav,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      dispatch: dispatch,
   };
};

function checkAllow(data, module) {
   let matched = false;
   for (let i = 0; i < data.length; i++) {
      if (data[i].module_id === module) {
         matched = true;
         return data[i].allow;
      }
   }
   if (matched === false) {
      return false;
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
