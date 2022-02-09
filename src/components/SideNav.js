import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

//assets image
import logo from '../assets/img/logo.png';
//constant
import { sidenav } from '../constant/sidenav';

function SideNav() {
   return (
      <div className='side-nav-container'>
         <div className='app-logo uncopy'>
            <img src={logo} alt='app logo' className='uncopy' />
         </div>
         <div className='nav-icon-wrapper'>
            <SideNavMenu ico='apps-outline' text='Dashboard' to='/' />
            <SideNavMenu ico='document-text-outline' text='Reports' to='/reportes' />
            <SideNavMenu ico='storefront-outline' text='Store' submenu={sidenav.products} />
            <SideNavMenu ico='repeat-outline' text='Stock' submenu={sidenav.stock} />
            <SideNavMenu ico='newspaper-outline' text='invoices' to='/invoice' />
            <SideNavMenu ico='cash-outline' text='Payments' to='/payments' />
            <SideNavMenu ico='people-outline' text='customers' to='/customers' />
            <SideNavMenu ico='book-outline' text='Accounts' submenu={sidenav.accounts} />
            <Divider />
            <SideNavMenu ico='settings-outline' text='settings' to='/settings' />
            <SideNavMenu ico='exit-outline' text='logout' to='/logout' />
         </div>
      </div>
   );
}

class Divider extends React.Component {
   render() {
      return <div className='nav-divider'></div>;
   }
}

function SideNavMenu(props) {
   const [state, setState] = useState({ show: false });
   const { submenu, to, text, ico } = props;
   let mainActiveEve = ({ isActive }) => (isActive ? 'side-nav-menu-head active' : 'side-nav-menu-head');
   let subActiveEve = ({ isActive }) => (isActive ? 'side-nav-menu-body-item active' : 'side-nav-menu-body-item');
   if (submenu.length > 0) {
      return (
         <div className='side-nav-menu-wrapper'>
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
                  return (
                     <NavLink to={`${to ? to : ''}${v.to}`} className={subActiveEve} key={i}>
                        <span className='uncopy'>{v.text}</span>
                     </NavLink>
                  );
               })}
            </div>
         </div>
      );
   } else {
      return (
         <div className='side-nav-menu-wrapper'>
            <NavLink to={to} className={mainActiveEve}>
               <div className='side-nav-menu-info'>
                  <ion-icon name={ico}></ion-icon>
                  <span className='uncopy'>{text}</span>
               </div>
            </NavLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
