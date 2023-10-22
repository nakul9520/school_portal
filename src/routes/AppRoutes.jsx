import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import PageNotFound from "components/PageNotFound";
// import Loadable from "components/common/loader/Loadable";

// without lazy layout

import Dashboard from "components/dashboard/app/Dashboard";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Class from "components/dashboard/class/Class";
import AddSchoolForm from "components/dashboard/app/AddSchoolForm";
import Login from "components/auth/Login";
// private
// const DashboardLayout = Loadable(
//   lazy(() => import("layout/dashboard/DashboardLayout"))
// );

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/dashboard" element={<PrivateLayout />}> */}
          <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<Navigate to="/dashboard/app" />} index />
          <Route path="/dashboard/app" element={<Dashboard />} />
          <Route path="/dashboard/add-school" element={<AddSchoolForm />} />
          <Route path="/dashboard/class" element={<Class />} />
        </Route>
        {/* </Route> */}  

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
