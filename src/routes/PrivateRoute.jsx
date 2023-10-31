import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getSession } from "services/utiles";


const PrivateRoute = () => {
  const location = useLocation();
  const { authToken } = getSession();
  return (
    <>
      {authToken ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
