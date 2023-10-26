import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import PageNotFound from "components/PageNotFound";
// import Loadable from "components/common/loader/Loadable";

// without lazy layout

import Login from "components/auth/Login";
import DashboardLayout from "../layout/dashboard/DashboardLayout";

import { Typography } from "@mui/material";
import Dashboard from "components/dashboard/school/Dashboard";
import AddSchoolForm from "components/dashboard/school/AddSchoolForm";
import MassSchool from "components/dashboard/school/MassSchool";

import Class from "components/dashboard/class/Class";
import AddClassForm from "components/dashboard/class/AddClassForm";
import MassClass from "components/dashboard/class/MassClass";

import Teacher from "components/dashboard/teacher/Teacher";
import AddTeacherForm from "components/dashboard/teacher/AddTeacherForm";
import MassTeacher from "components/dashboard/teacher/MassTeacher";

import Student from "components/dashboard/student/Student";
import AddStudentForm from "components/dashboard/student/AddStudentForm";
import MassStudent from "components/dashboard/student/MassStudent";

import Reports from "components/dashboard/reports/Reports";
import SchoolReportDataTable from "components/dashboard/reports/school-report/SchoolReportDataTable";
import BookReportDataTable from "components/dashboard/reports/book-report/BookReportDataTable";
import LevelingUp from "components/dashboard/leveling/LevelingUp";
import BooksSelect from "components/dashboard/leveling/BooksSelect";
import Assignment from "components/dashboard/assignment/Assignment";
import AssignmentSelect from "components/dashboard/assignment/AssignmentSelect";
import LibraryCategories from "components/dashboard/contents/LibraryCategories";
import Contents from "components/dashboard/contents/Contents";
import BookDesign from "components/dashboard/contents/BookDesign";

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
          {/* School */}
          <Route path="/dashboard/school" element={<Dashboard />} />
          <Route path="/dashboard/mass-school" element={<MassSchool />} />
          <Route path="/dashboard/add-school" element={<AddSchoolForm />} />
          {/* Class */}
          <Route path="/dashboard/class" element={<Class />} />
          <Route path="/dashboard/add-class" element={<AddClassForm />} />
          <Route path="/dashboard/mass-class" element={<MassClass />} />
          {/* Teacher's */}
          <Route path="/dashboard/teacher" element={<Teacher />} />
          <Route path="/dashboard/add-teacher" element={<AddTeacherForm />} />
          <Route path="/dashboard/mass-teacher" element={<MassTeacher />} />
          {/* Student */}
          <Route path="/dashboard/student" element={<Student />} />
          <Route path="/dashboard/add-student" element={<AddStudentForm />} />
          <Route path="/dashboard/mass-student" element={<MassStudent />} />
          <Route
            path="/dashboard/username-and-groups"
            element={<Typography variant="h5">Username And Groups</Typography>}
          />
          {/* Reports */}
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route
            path="/dashboard/totalschool-reports"
            element={<SchoolReportDataTable />}
          />
          <Route
            path="/dashboard/totalbook-reports"
            element={<BookReportDataTable />}
          />
          {/* Leveling Up */}
          <Route path="/dashboard/leveling" element={<LevelingUp />} />
          <Route
            path="/dashboard/level-book-select"
            element={<BooksSelect />}
          />
          {/* Assignment */}
          <Route path="/dashboard/assignment" element={<Assignment />} />
          <Route
            path="/dashboard/assignment-select"
            element={<AssignmentSelect />}
          />
          {/* Contents */}
          <Route path="/dashboard/contents" element={<Contents />} />
          <Route
            path="/dashboard/library-categories"
            element={<LibraryCategories />}
          />{" "}
          <Route path="/dashboard/book-design" element={<BookDesign />} />
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
