import React from "react";
import { Grid, Container, Box } from "@mui/material";
import StatCard from "../../components/Card/StatCard";
import CompanyOverview from "../../components/Card/CompanyOverview";

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Total Company"
            value="560"
            update="+12%"
            date="July 16, 2023"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Total Admin"
            value="1050"
            update="+5%"
            date="July 14, 2023"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Total Employee"
            value="250"
            update="+12%"
            date="July 10, 2023"
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
