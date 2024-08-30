import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import { detailCompany } from "../redux/slices/companySlice";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { id_company } = useParams();
  const dispatch = useDispatch();

  const companyDetail = useSelector((state) => state.companies.detail);

  useEffect(() => {
    if (id_company) {
      dispatch(detailCompany(id_company));
    }
  }, [id_company, dispatch]);

  const nameMap = {
    administrators: "Administrators",
    companies: "All Companies",
    "admin-detail": "Admin Details",
  };

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNext fontSize="small" />}
    >
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // Use company name for company-detail route
        const displayName =
          nameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

        return isLast ? (
          <Typography color="textPrimary" key={name}>
            {displayName}
          </Typography>
        ) : (
          <Link color="inherit" component={RouterLink} to={routeTo} key={name}>
            {displayName}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default BreadCrumbs;
