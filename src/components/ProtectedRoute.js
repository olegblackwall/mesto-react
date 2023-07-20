import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectTo, isLogin }) {
    return isLogin ? children : <Navigate to={redirectTo} />;
  }

export default ProtectedRoute;
