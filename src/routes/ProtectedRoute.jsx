import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getSession } from "services/service";

const ProtectedRoute = () => {
  const location = useLocation();
  const { Authorization, setPassword } = getSession() ?? "";
  console.log("ProtectedRoute");
  return (
    <>
      {Authorization && setPassword === "false" ? (
        <Outlet />
      ) : (
        <Navigate to="/dashboard" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
