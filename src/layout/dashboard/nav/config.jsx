// component
import SvgColor from "components/common/svg-color/SvgColor";
import { imageBasePath } from "services/constant";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`${imageBasePath}icons/navbar/${name}.svg`}
    sx={{ width: 0.8, height: 0.8 }}
  />
);

const navConfig = [
  {
    title: "School",
    path: "/dashboard/school", //when you change link update missing and wanted short details page
    icon: icon("school"),
    children: [
      {
        title: "Pin Up Board",
        path: "/dashboard/school",
        icon: icon("school"),
      },
    ],
  },
  {
    title: "Class",
    path: "/dashboard/class",
    icon: icon("class"),
  },
  {
    title: "Teacher",
    path: "/dashboard/teacher",
    icon: icon("teachers"),
  },
  {
    title: "Student",
    path: "/dashboard/student",
    icon: icon("students"),
  },
  {
    title: "Username And Groups",
    path: "/dashboard/username-and-groups",
    icon: icon("groups"),
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: icon("reports"),
  },
  {
    title: "Leveling",
    path: "/dashboard/leveling",
    icon: icon("leveling"),
  },
  {
    title: "Assignment",
    path: "/dashboard/assignment",
    icon: icon("assignment"),
  },
  {
    title: "Contents",
    path: "/dashboard/contents",
    icon: icon("contents"),
  },
  {
    title: "System Settings",
    path: "/dashboard/system-settings",
    icon: icon("system-settings"),
  },
  {
    title: "Dramatization",
    path: "/dashboard/dramatization",
    icon: icon("dramatization"),
  },
];

export default navConfig;
