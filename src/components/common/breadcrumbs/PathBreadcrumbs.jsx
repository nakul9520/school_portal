import * as React from "react";

import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";

import { some } from "lodash";
import { Link as RouterLink, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/dashboard": "Dashboard",

  "/dashboard/username-and-groups": "Kullanıcı Adı ve Gruplar",

  "/dashboard/username-and-groups/school": "Okul",
  "/dashboard/username-and-groups/add-school": "Okul",
  "/dashboard/username-and-groups/mass-school": "Okul",

  "/dashboard/username-and-groups/school-admin": "Okul Yöneticisi",
  "/dashboard/username-and-groups/add-school-admin": "Okul Yöneticisi",

  "/dashboard/username-and-groups/class": "Sınıf",
  "/dashboard/username-and-groups/add-class": "Sınıf",
  "/dashboard/username-and-groups/mass-class": "Sınıf",

  "/dashboard/username-and-groups/teacher": "Öğretmen",
  "/dashboard/username-and-groups/add-teacher": "Öğretmen",
  "/dashboard/username-and-groups/mass-teacher": "Öğretmen",

  "/dashboard/username-and-groups/student": "Öğrenci",
  "/dashboard/username-and-groups/add-student": "Öğrenci",
  "/dashboard/username-and-groups/mass-student": "Öğrenci",

  "/dashboard/reports": "Raporlar",
  "/dashboard/reports/school-reports": "Okul Raporlar",
  "/dashboard/reports/get-school-reports": "Okul Raporlar",
  "/dashboard/reports/book-reports": "Kitap Raporlar",
  "/dashboard/reports/get-book-reports": "Kitap Raporlar",
  "/dashboard/reports/system-reports": "Sistem Raporlar",
  "/dashboard/reports/get-system-reports": "Sistem Raporlar",

  "/dashboard/leveling": "Seviyelendirme",

  "/dashboard/assignment": "Görevlendirme",

  "/dashboard/contents": "İçerik",
  "/dashboard/contents/platform-design": "Platrofm Tasarımı",
  "/dashboard/contents/platform-design/creating-page": "Sayfa Oluşturuluyor",
  "/dashboard/contents/platform-design/add-creating-page":
    "Sayfa Oluşturuluyor",
  "/dashboard/contents/platform-design/social-content": "Sosyal İçerik",
  "/dashboard/contents/platform-design/add-social-content": "Sosyal İçerik",
  "/dashboard/contents/platform-design/downloadable-content":
    "İndirilebilir İçerik",
  "/dashboard/contents/platform-design/add-downloadable-content":
    "İndirilebilir İçerik",
  "/dashboard/contents/platform-design/video-content": "Video İçerik",
  "/dashboard/contents/platform-design/add-video-content": "Video İçerik",

  "/dashboard/contents/library-categories": "Kitaplık Kategorileri",
  "/dashboard/contents/book-design": "Kitap Tasarımı",
  "/dashboard/contents/add-book-topic": "Kitap Ekle",
  "/dashboard/contents/create-book-event": "Kitap Etkinlikleri",

  "/dashboard/system-settings": "Sistem Ayarları",
  "/dashboard/system-settings/edit": "edit",
  "/dashboard/system-settings/sub-admin": "sub admin",
  "/dashboard/system-settings/add-sub-admin": "sub admin",

  "/dashboard/dramatization": "Oyunlaştırma",
};

const LinkRouter = (props) => (
  <Link variant="caption" {...props} component={RouterLink} />
);

const PathBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const hidePathsList = [];
  const hideBreadcrumb = some(hidePathsList, (item) => {
    return item.path === location.pathname;
  });
  return (
    <>
      {!hideBreadcrumb ? (
        <Stack direction="row" className="align-items-center gap-2 my-2">
          <Breadcrumbs aria-label="breadcrumb" separator="-">
            {pathnames.map((value, index) => {
              const last = Boolean(index === pathnames.length - 1);
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return last ? (
                <Typography
                  variant="caption"
                  color="text.contrastText"
                  key={to}
                  className="fw-bold"
                >
                  {breadcrumbNameMap[to]}
                </Typography>
              ) : (
                <LinkRouter
                  className="text-decoration-none"
                  color="text.contrastText"
                  to={to}
                  key={to}
                >
                  {breadcrumbNameMap[to]}
                </LinkRouter>
              );
            })}
          </Breadcrumbs>
        </Stack>
      ) : null}
    </>
  );
};

export default PathBreadcrumbs;
