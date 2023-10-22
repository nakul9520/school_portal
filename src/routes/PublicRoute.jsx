import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getSession } from "services/service";

const PublicRoute = () => {
  const location = useLocation();
  const { Authorization, setPassword } = getSession() ?? "";
  console.log("PublicRoute");
  return (
    <>
      {Authorization ? (
        setPassword === "false" ? (
          <Navigate to="/create-password" state={{ from: location }} replace />
        ) : (
          <Navigate to="/dashboard" state={{ from: location }} replace />
        )
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PublicRoute;
