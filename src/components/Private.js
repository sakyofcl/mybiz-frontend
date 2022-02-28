import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Private = (props) => {
   const { auth } = useSelector((state) => state);
   const Ele = props.ele;
   return auth.isOk ? <Ele /> : <Navigate to='/login' />;
};

export default Private;
