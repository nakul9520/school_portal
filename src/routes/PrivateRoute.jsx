import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getSession } from "services/service";

const PrivateRoute = () => {
  const location = useLocation();
  const { Authorization, setPassword } = getSession() ?? "";
  console.log("PrivateRoute");
  return (
    <>
      {Authorization ? (
        setPassword === "false" ? (
          <Navigate to="/create-password" state={{ from: location }} replace />
        ) : (
          <Outlet />
        )
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
