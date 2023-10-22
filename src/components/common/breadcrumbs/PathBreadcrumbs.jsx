import * as React from "react";

import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";

import { some } from "lodash";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import Iconify from "../iconify/Iconify";

const breadcrumbNameMap = {
  "/dashboard": "Dashboard",
};

const LinkRouter = (props) => (
  <Link variant="caption" {...props} component={RouterLink} />
);

const PathBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const hidePathsList = [{ path: "/dashboard/school" }];
  const hideBreadcrumb = some(hidePathsList, (item) => {
    return item.path === location.pathname;
  });
  return (
    <>
      {!hideBreadcrumb ? (
        <Stack direction="row" className="align-items-center gap-2 my-3">
          <Iconify
            icon="eva:arrow-left-fill"
            width="28px"
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />

          <Breadcrumbs
            aria-label="breadcrumb"
            separator={
              <Iconify icon="eva:arrow-ios-forward-fill" width="12px" />
            }
            maxItems={2}
          >
            {pathnames.map((value, index) => {
              const last = Boolean(index === pathnames.length - 1);
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return last ? (
                <Typography
                  variant="caption"
                  color="text.primary"
                  key={to}
                  className="fw-bold"
                >
                  {breadcrumbNameMap[to]}
                </Typography>
              ) : (
                <LinkRouter
                  className="text-decoration-none"
                  color="text.secondary"
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
