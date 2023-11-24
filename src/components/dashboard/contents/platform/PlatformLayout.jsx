import React from "react";
import { Outlet } from "react-router-dom";

const PlatformLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PlatformLayout;
