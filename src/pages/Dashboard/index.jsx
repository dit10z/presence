import React, { useEffect } from "react";
import { Grid, Container, Box } from "@mui/material";
import StatCard from "../../components/Card/StatCard";
import CompanyOverview from "../../components/Card/CompanyOverview";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDashboard } from "../../redux/slices/dashboardSlice";
import dayjs from "dayjs";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDataDashboard());
  }, [dispatch]);

  console.log(data);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Total Company"
            value={data.company?.total_company}
            update="+12%"
            date={
              data.company?.last_update
                ? dayjs(data.company?.last_update).format("DD-MM-YYYY")
                : "N/A"
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Total Admin"
            value={data.admin?.total_admin}
            update="+5%"
            date={
              data.admin?.last_update
                ? dayjs(data.admin?.last_update).format("DD-MM-YYYY")
                : "N/A"
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Total Employee"
            value={data.employee?.total_employee}
            update="+12%"
            date={
              data.employee?.last_update
                ? dayjs(data.employee?.last_update).format("DD-MM-YYYY")
                : "N/A"
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <CompanyOverview />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
