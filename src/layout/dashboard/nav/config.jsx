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
    id: 1,
    title: "Okul",
    path: "/dashboard/school",
  },
  { id: 2, title: "Sınıf", path: "/dashboard/class", icon: icon("class") },
  {
    id: 3,
    title: "Öğretmen",
    path: "/dashboard/teacher",
    icon: icon("teachers"),
  },
  {
    id: 4,
    title: "Öğrenci",
    path: "/dashboard/student",
    icon: icon("students"),
    divider: true,
  },
  {
    id: 5,
    title: "Kullanıcı Adı ve Gruplar",
    path: "/dashboard/username-and-groups",
    icon: icon("groups"),
  },
  {
    id: 6,
    title: "Raporlar",
    icon: icon("reports"),
    path: "/dashboard/reports",
    type: "collapse",
    children: [
      {
        id: 6.1,
        title: "Okul Raporları",
        path: "/dashboard/reports/school-reports",
      },
      {
        id: 6.2,
        title: "Kitap Raporları",
        path: "/dashboard/reports/book-reports",
      },
      {
        id: 6.3,
        title: "Sistem Raporları",
        path: "/dashboard/reports/system-reports",
      },
    ],
  },
  {
    id: 7,
    title: "Seviyelendirme",
    path: "/dashboard/leveling",
    icon: icon("leveling"),
  },
  {
    id: 8,
    title: "Görevlendirme",
    path: "/dashboard/assignment",
    icon: icon("assignment"),
  },
  {
    id: 9,
    title: "İçerik",
    path: "/dashboard/contents",
    icon: icon("contents"),
    type: "collapse",
    children: [
      {
        id: 9.1,
        title: "Platform Tasarımı",
        path: "/dashboard/contents/platform-design",
      },
      {
        id: 9.2,
        title: "Kitaplık Kategorileri",
        path: "/dashboard/contents/library-categories",
      },
      {
        id: 9.3,
        title: "Kitap Tasarımı",
        path: "/dashboard/contents/book-design",
      },
    ],
  },
  {
    id: 10,
    title: "Sistem Ayarları",
    path: "/dashboard/system-settings",
    icon: icon("system-settings"),
  },
  {
    id: 11,
    title: "Oyunlaştırma",
    path: "/dashboard/dramatization",
    icon: icon("dramatization"),
  },
];

export default navConfig;
