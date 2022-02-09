import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
//Component
import SideNav from './SideNav';
import TopNav from './TopNav';
import Content from './Content';
import Footer from './Footer';

function AppLayout() {
   const { sidenav } = useSelector((state) => state);

   return (
      <div className={`app ${sidenav.show ? 'side-nav-show' : 'side-nav-hide'}`}>
         <TopNav />
         <SideNav />
         <Content>
            <Outlet />
         </Content>
      </div>
   );
}
export default AppLayout;
