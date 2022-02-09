import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { toggleSideNav } from '../redux/action/sidenav';
import profile from '../assets/img/profile.jpg';
function TopNav() {
   let navigate = useNavigate();
   let dispatch = useDispatch();
   return (
      <div className='top-nav-container'>
         <div className='top-nav'>
            <div className='top-nav-left d-flex h-100 align-items-center'>
               <TopNavIcon
                  ico='menu-outline'
                  clickUp={(e) => {
                     toggleSideNav(dispatch);
                  }}
               />
            </div>
            <div className='top-nav-right d-flex h-100 align-items-center'>
               <TopNavIcon ico='sunny-outline' />
               <TopNavIcon ico='notifications-outline' />
               <TopNavIcon
                  img={profile}
                  drop={true}
                  item={() => {
                     return (
                        <>
                           <DropItem
                              text='Profile'
                              click={(e) => {
                                 navigate('/foods');
                              }}
                           />
                           <DropItem text='Account' />
                           <DropItem text='Logout' />
                        </>
                     );
                  }}
               />
            </div>
         </div>
      </div>
   );
}

function TopNavIcon(props) {
   const { ico, img, clickUp, drop, item } = props;

   return (
      <Dropdown>
         <Dropdown.Toggle className='top-nav-icon uncopy' onMouseUp={clickUp}>
            {ico ? <ion-icon name={ico}></ion-icon> : <img src={img} alt='Haji Hotel' />}
         </Dropdown.Toggle>
         {drop ? <Dropdown.Menu>{item()}</Dropdown.Menu> : ''}
      </Dropdown>
   );
}
function DropItem(props) {
   const { text, click } = props;

   return <Dropdown.Item onClick={click}>{text}</Dropdown.Item>;
}

TopNavIcon.defaultProps = {
   clickUp: (e) => {},
   drop: false,
   item: () => {},
};
DropItem.defaultProps = {
   click: (e) => {},
};

export default TopNav;
