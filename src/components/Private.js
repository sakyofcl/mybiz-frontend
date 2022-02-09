import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Private = (props) => {
   const Ele = props.ele;
   //const authStore=useSelector((state)=>state.auth);
   return true ? <Ele /> : <Navigate to='/login' />;
};

export default Private;
