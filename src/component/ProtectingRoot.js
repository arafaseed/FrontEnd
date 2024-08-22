import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectingRoot = ({role}) => {
    const userRole = localStorage.getItem('role');

    if (!userRole || userRole !==role){
        return<Navigate to="/" replace />;
    }

  return <Outlet/>;
};

export default ProtectingRoot
