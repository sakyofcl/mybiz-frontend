import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

//action
import { storeLogout } from '../../redux/action/auth';

function Logout(props) {
   const dispatch = useDispatch();
   useEffect(() => {
      storeLogout(dispatch);
   }, []);

   return <Navigate to='/login' />;
}

export default Logout;
