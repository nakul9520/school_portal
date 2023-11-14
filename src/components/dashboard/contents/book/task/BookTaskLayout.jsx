import React from "react";
import { Outlet } from "react-router-dom";

const BookTaskLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BookTaskLayout;
