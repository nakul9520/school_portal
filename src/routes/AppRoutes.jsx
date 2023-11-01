import { Navigate, Route, Routes } from "react-router-dom";

import PageNotFound from "components/PageNotFound";
// import Loadable from "components/common/loader/Loadable";

// without lazy layout

import Login from "components/auth/Login";
import DashboardLayout from "../layout/dashboard/DashboardLayout";

import { Typography } from "@mui/material";
import AddSchoolForm from "components/dashboard/school/AddSchoolForm";
import Dashboard from "components/dashboard/school/Dashboard";
import MassSchool from "components/dashboard/school/MassSchool";

import AddClassForm from "components/dashboard/class/AddClassForm";
import Class from "components/dashboard/class/Class";
import MassClass from "components/dashboard/class/MassClass";

import AddTeacherForm from "components/dashboard/teacher/AddTeacherForm";
import MassTeacher from "components/dashboard/teacher/MassTeacher";
import Teacher from "components/dashboard/teacher/Teacher";

import AddStudentForm from "components/dashboard/student/AddStudentForm";
import MassStudent from "components/dashboard/student/MassStudent";
import Student from "components/dashboard/student/Student";

import Reports from "components/dashboard/reports/Reports";

import BooksSelect from "components/dashboard/leveling/BooksSelect";
import LevelingUp from "components/dashboard/leveling/LevelingUp";

import Assignment from "components/dashboard/assignment/Assignment";
import AssignmentSelect from "components/dashboard/assignment/AssignmentSelect";

import Contents from "components/dashboard/contents/Contents";
import AddBookTopic from "components/dashboard/contents/book/AddBookTopic";
import BookDesign from "components/dashboard/contents/book/BookDesign";
import CreateBookAndEvent from "components/dashboard/contents/book/CreateBookAndEvent";
import LibraryCategories from "components/dashboard/contents/library/LibraryCategories";
import PlatFormDesign from "components/dashboard/contents/platform/PlatFormDesign";

import SystemSetting from "components/dashboard/system-setting/SystemSetting";

import BookReports from "components/dashboard/reports/book-report/BookReports";
import GetBookReportTable from "components/dashboard/reports/book-report/GetBookReportTable";
import GetSchoolReportTable from "components/dashboard/reports/school-report/GetSchoolReportTable";
import SchoolReports from "components/dashboard/reports/school-report/SchoolReports";
import GetSystemReportTable from "components/dashboard/reports/system-report/GetSystemReportTable";
import SystemReports from "components/dashboard/reports/system-report/SystemReports";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// private
// const DashboardLayout = Loadable(
//   lazy(() => import("layout/dashboard/DashboardLayout"))
// );

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
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
              element={
                <Typography variant="h5">Username And Groups</Typography>
              }
            />
            {/* Reports */}
            <Route path="/dashboard/reports" element={<Reports />}>
              <Route
                element={<Navigate to="/dashboard/reports/school-reports" />}
                index
              />
              <Route
                path="/dashboard/reports/school-reports"
                element={<SchoolReports />}
              />
              <Route
                path="/dashboard/reports/get-school-reports"
                element={<GetSchoolReportTable />}
              />
              <Route
                path="/dashboard/reports/book-reports"
                element={<BookReports />}
              />
              <Route
                path="/dashboard/reports/get-book-reports"
                element={<GetBookReportTable />}
              />
              <Route
                path="/dashboard/reports/system-reports"
                element={<SystemReports />}
              />
              <Route
                path="/dashboard/reports/get-system-reports"
                element={<GetSystemReportTable />}
              />
            </Route>
            {/* Leveling Up */}
            <Route path="/dashboard/leveling">
              <Route
                path="/dashboard/leveling"
                element={<LevelingUp />}
                index
              />
              <Route
                path="/dashboard/leveling/book-select"
                element={<BooksSelect />}
              />
            </Route>
            {/* Assignment */}
            <Route path="/dashboard/assignment" element={<Assignment />} />
            <Route
              path="/dashboard/assignment-select"
              element={<AssignmentSelect />}
            />
            {/* Contents */}
            <Route path="/dashboard/contents" element={<Contents />}>
              <Route
                element={<Navigate to="/dashboard/contents/platform-design" />}
                index
              />
              <Route
                path="/dashboard/contents/platform-design"
                element={<PlatFormDesign />}
              />
              <Route
                path="/dashboard/contents/library-categories"
                element={<LibraryCategories />}
              />
              <Route
                path="/dashboard/contents/book-design"
                element={<BookDesign />}
              />
              <Route
                path="/dashboard/contents/add-book-topic"
                element={<AddBookTopic />}
              />
              <Route
                path="/dashboard/contents/create-book-event"
                element={<CreateBookAndEvent />}
              />
            </Route>
            {/* System Setting */}
            <Route
              path="/dashboard/system-settings"
              element={<SystemSetting />}
            />
            <Route
              path="/dashboard/dramatization"
              element={<Typography variant="h5">dramatization</Typography>}
            />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
