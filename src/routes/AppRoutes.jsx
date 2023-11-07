import { Navigate, Route, Routes } from "react-router-dom";

import PageNotFound from "components/PageNotFound";
// import Loadable from "components/common/loader/Loadable";

// without lazy layout

import Login from "components/auth/Login";
import DashboardLayout from "../layout/dashboard/DashboardLayout";

import { Typography } from "@mui/material";

import Dashboard from "components/dashboard/username-and-groups/school/Dashboard";
import AddSchoolForm from "components/dashboard/username-and-groups/school/AddSchoolForm";
import MassSchool from "components/dashboard/username-and-groups/school/MassSchool";

import AddClassForm from "components/dashboard/username-and-groups/class/AddClassForm";
import Class from "components/dashboard/username-and-groups/class/Class";
import MassClass from "components/dashboard/username-and-groups/class/MassClass";

import AddTeacherForm from "components/dashboard/username-and-groups/teacher/AddTeacherForm";
import MassTeacher from "components/dashboard/username-and-groups/teacher/MassTeacher";
import Teacher from "components/dashboard/username-and-groups/teacher/Teacher";

import AddStudentForm from "components/dashboard/username-and-groups/student/AddStudentForm";
import MassStudent from "components/dashboard/username-and-groups/student/MassStudent";
import Student from "components/dashboard/username-and-groups/student/Student";

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
import UsersAndGroups from "components/dashboard/username-and-groups/UsersAndGroups";
import CreatingPage from "components/dashboard/contents/platform/creating-page/CreatingPage";
import PlatformLayout from "components/dashboard/contents/platform/PlatformLayout";
import AddCreatingPage from "components/dashboard/contents/platform/creating-page/AddCreatingPage";
import SocialContent from "components/dashboard/contents/platform/social-content/SocialContent";
import AddSocialContent from "components/dashboard/contents/platform/social-content/AddSocialContent";
import DownloadableContent from "components/dashboard/contents/platform/downloadable-content/DownloadableContent";
import AddDownloadableContent from "components/dashboard/contents/platform/downloadable-content/AddDownloadableContent";
import VideoContent from "components/dashboard/contents/platform/video-content/VideoContent";
import AddVideoContent from "components/dashboard/contents/platform/video-content/AddVideoContent";
import FAQList from "components/dashboard/contents/platform/faq/FAQList";
import AddFAQ from "components/dashboard/contents/platform/faq/AddFAQ";

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
            <Route
              element={<Navigate to="/dashboard/username-and-groups" />}
              index
            />

            {/* User & Groups */}
            <Route
              path="/dashboard/username-and-groups"
              element={<UsersAndGroups />}
            >
              {/* school */}
              <Route
                path="/dashboard/username-and-groups/school"
                index
                element={<Dashboard />}
              />
              <Route
                path="/dashboard/username-and-groups/mass-school"
                element={<MassSchool />}
              />
              <Route
                path="/dashboard/username-and-groups/add-school"
                element={<AddSchoolForm />}
              />

              {/* Class */}
              <Route
                path="/dashboard/username-and-groups/class"
                element={<Class />}
              />
              <Route
                path="/dashboard/username-and-groups/add-class"
                element={<AddClassForm />}
              />
              <Route
                path="/dashboard/username-and-groups/mass-class"
                element={<MassClass />}
              />
              {/* Teacher's */}
              <Route
                path="/dashboard/username-and-groups/teacher"
                element={<Teacher />}
              />
              <Route
                path="/dashboard/username-and-groups/add-teacher"
                element={<AddTeacherForm />}
              />
              <Route
                path="/dashboard/username-and-groups/mass-teacher"
                element={<MassTeacher />}
              />
              {/* Student */}
              <Route
                path="/dashboard/username-and-groups/student"
                element={<Student />}
              />
              <Route
                path="/dashboard/username-and-groups/add-student"
                element={<AddStudentForm />}
              />
              <Route
                path="/dashboard/username-and-groups/mass-student"
                element={<MassStudent />}
              />
            </Route>

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
                element={<PlatformLayout />}
              >
                {/* creating page */}
                <Route element={<PlatFormDesign />} index />
                <Route path="creating-page" element={<CreatingPage />} />
                <Route path="add-creating-page" element={<AddCreatingPage />} />

                {/* social content page */}
                <Route path="social-content" element={<SocialContent />} />
                <Route
                  path="add-social-content"
                  element={<AddSocialContent />}
                />

                {/* Downloadable content page */}
                <Route
                  path="downloadable-content"
                  element={<DownloadableContent />}
                />
                <Route
                  path="add-downloadable-content"
                  element={<AddDownloadableContent />}
                />

                {/* video content page */}
                <Route path="video-content" element={<VideoContent />} />
                <Route path="add-video-content" element={<AddVideoContent />} />

                {/* FAQ page */}
                <Route path="faq" element={<FAQList />} />
                <Route path="add-faq" element={<AddFAQ />} />
              </Route>
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
