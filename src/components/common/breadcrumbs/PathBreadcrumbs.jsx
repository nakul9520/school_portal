import * as React from "react";

import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";

import { some } from "lodash";
import { Link as RouterLink, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/dashboard": "Dashboard",

  "/dashboard/school": "Okul",
  "/dashboard/add-school": "Okul",
  "/dashboard/mass-school": "Okul",

  "/dashboard/class": "Sınıf",
  "/dashboard/add-class": "Sınıf",
  "/dashboard/mass-class": "Sınıf",

  "/dashboard/teacher": "Öğretmen",
  "/dashboard/add-teacher": "Öğretmen",
  "/dashboard/mass-teacher": "Öğretmen",

  "/dashboard/student": "Öğrenci",
  "/dashboard/add-student": "Öğrenci",
  "/dashboard/mass-student": "Öğrenci",

  "/dashboard/username-and-groups": "Kullanıcı Adı ve Gruplar",

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

  "/dashboard/system-settings": "Sistem Ayarları",

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
