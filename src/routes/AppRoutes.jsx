import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import PageNotFound from "components/PageNotFound";
// import Loadable from "components/common/loader/Loadable";

// without lazy layout

import Dashboard from "components/dashboard/school/Dashboard";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Class from "components/dashboard/class/Class";
import AddSchoolForm from "components/dashboard/school/AddSchoolForm";

import Login from "components/auth/Login";
import AddClassForm from "components/dashboard/class/AddClassForm";
import Teacher from "components/dashboard/teacher/Teacher";
import AddTeacherForm from "components/dashboard/teacher/AddTeacherForm";

import { Typography } from "@mui/material";
import MassSchool from "components/dashboard/school/MassSchool";
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
          <Route element={<Navigate to="/dashboard/school" />} index />
          <Route path="/dashboard/school" element={<Dashboard />} />
          <Route path="/dashboard/mass-school" element={<MassSchool />} />
          <Route path="/dashboard/add-school" element={<AddSchoolForm />} />

          <Route path="/dashboard/class" element={<Class />} />
          <Route path="/dashboard/add-class" element={<AddClassForm />} />

          <Route path="/dashboard/teacher" element={<Teacher />} />
          <Route path="/dashboard/add-teacher" element={<AddTeacherForm />} />
          <Route
            path="/dashboard/teacher"
            element={<Typography variant="h5">Teacher</Typography>}
          />
          <Route
            path="/dashboard/Student"
            element={<Typography variant="h5">Student</Typography>}
          />
          <Route
            path="/dashboard/username-and-groups"
            element={<Typography variant="h5">Username And Groups</Typography>}
          />
          <Route
            path="/dashboard/reports"
            element={<Typography variant="h5">Reports</Typography>}
          />
          <Route
            path="/dashboard/leveling"
            element={<Typography variant="h5">leveling</Typography>}
          />
          <Route
            path="/dashboard/assignment"
            element={<Typography variant="h5">assignment</Typography>}
          />
          <Route
            path="/dashboard/contents"
            element={<Typography variant="h5">contents</Typography>}
          />{" "}
          <Route
            path="/dashboard/system-settings"
            element={<Typography variant="h5">system-settings</Typography>}
          />
          <Route
            path="/dashboard/dramatization"
            element={<Typography variant="h5">dramatization</Typography>}
          />
        </Route>
        {/* </Route> */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
