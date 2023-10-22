// component
import SvgColor from "components/common/svg-color/SvgColor";
import { imageBasePath } from "services/images";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`${imageBasePath}icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Okul",
    path: "/dashboard/app", //when you change link update missing and wanted short details page
    icon: icon("school"),
    children: [
      {
        title: "Pin Up Board",
        path: "/dashboard/app",
        icon: icon("school"),
      },
    ],
  },
  {
    title: "Sınıf",
    path: "/dashboard/class",
    icon: icon("ic_chats"),
  },
  {
    title: "Schedule",
    path: "/dashboard/schedule",
    icon: icon("ic_schedule"),
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: icon("ic_profile"),
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: icon("ic_settings"),
  },
];

export default navConfig;
