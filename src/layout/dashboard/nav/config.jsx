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
    title: "Kullanıcı Adı ve Gruplar",
    icon: icon("groups"),
    // path: "/dashboard/username-and-groups",
    type: "collapse",
    children: [
      {
        id: 1.1,
        title: "Okul",
        path: "/dashboard/username-and-groups/school",
      },
      {
        id: 1.2,
        title: "Okul Yöneticisi",
        path: "/dashboard/username-and-groups/school-admin",
      },
      {
        id: 1.3,
        title: "Sınıf",
        path: "/dashboard/username-and-groups/class",
        // icon: icon("class"),
      },
      {
        id: 1.4,
        title: "Öğretmen",
        path: "/dashboard/username-and-groups/teacher",
        // icon: icon("teachers"),
      },
      {
        id: 1.5,
        title: "Öğrenci",
        path: "/dashboard/username-and-groups/student",
        // icon: icon("students"),
      },
    ],
  },
  {
    id: 2,
    title: "Raporlar",
    icon: icon("reports"),
    // path: "/dashboard/reports",
    type: "collapse",
    children: [
      {
        id: 2.1,
        title: "Okul Raporları",
        path: "/dashboard/reports/school-reports",
      },
      {
        id: 2.2,
        title: "Kitap Raporları",
        path: "/dashboard/reports/book-reports",
      },
      // {
      //   id: 2.3,
      //   title: "Sistem Raporları",
      //   path: "/dashboard/reports/system-reports",
      // },
    ],
  },
  {
    id: 3,
    title: "Seviyelendirme",
    path: "/dashboard/leveling",
    icon: icon("leveling"),
  },
  {
    id: 4,
    title: "Görevlendirme",
    path: "/dashboard/assignment",
    icon: icon("assignment"),
  },
  {
    id: 5,
    title: "İçerik",
    // path: "/dashboard/contents",
    icon: icon("contents"),
    type: "collapse",
    children: [
      {
        id: 5.1,
        title: "Platform Tasarımı",
        path: "/dashboard/contents/platform-design",
      },
      {
        id: 5.2,
        title: "Kitaplık Kategorileri",
        path: "/dashboard/contents/library-categories",
      },
      {
        id: 5.3,
        title: "Kitap Tasarımı",
        path: "/dashboard/contents/book-design",
      },
    ],
  },
  {
    id: 6,
    title: "Sistem Ayarları",
    path: "/dashboard/system-settings",
    icon: icon("system-settings"),
  },
  {
    id: 7,
    title: "Oyunlaştırma",
    path: "/dashboard/badges",
    icon: icon("dramatization"),
  },
];

export default navConfig;
