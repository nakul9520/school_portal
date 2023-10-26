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
    title: "Okul",
    path: "/dashboard/school", //when you change link update missing and wanted short details page
    icon: icon("school"),
  },
  {
    title: "Sınıf",
    path: "/dashboard/class",
    icon: icon("class"),
  },
  {
    title: "Öğretmen",
    path: "/dashboard/teacher",
    icon: icon("teachers"),
  },
  {
    title: "Öğrenci",
    path: "/dashboard/student",
    icon: icon("students"),
    divider: true,
  },
  {
    title: "Kullanıcı Adı ve Gruplar",
    path: "/dashboard/username-and-groups",
    icon: icon("groups"),
  },
  {
    title: "Raporlar",
    path: "/dashboard/reports",
    icon: icon("reports"),
    // children: [
    //   {
    //     title: "Pin Up Board",
    //     path: "/dashboard/reports",
    //     icon: icon("reports"),
    //   },
    // ],
  },
  {
    title: "Seviyelendirme",
    path: "/dashboard/leveling",
    icon: icon("leveling"),
  },
  {
    title: "Görevlendirme",
    path: "/dashboard/assignment",
    icon: icon("assignment"),
  },
  {
    title: "İçerik",
    path: "/dashboard/contents",
    icon: icon("contents"),
  },
  {
    title: "Sistem Ayarları",
    path: "/dashboard/system-settings",
    icon: icon("system-settings"),
  },
  {
    title: "Oyunlaştırma",
    path: "/dashboard/dramatization",
    icon: icon("dramatization"),
  },
];

export default navConfig;
