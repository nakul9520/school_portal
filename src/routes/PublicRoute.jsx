import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getSession } from "services/utiles";

const PublicRoute = () => {
  const location = useLocation();
  const { authToken } = getSession();
  console.log("PublicRoute");
  return (
    <>
      {authToken ? (
        <Navigate to="/dashboard/school" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PublicRoute;
