import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import Logo from "../../assets/logo.png";

const CompanyDetail = () => {
  return (
    <Box display="flex" flexDirection="row" minHeight="100vh">
      {/* Main Content */}
      <Box flex={1} padding={4}>
        {/* Navbar section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h5" fontWeight="bold">
            Company Profile
          </Typography>
          <Typography variant="body2" color="textSecondary">
            All Companies &gt; PT. Padepokan Tujuh Sembilan
          </Typography>
        </Box>

        <Card sx={{ marginTop: 3, padding: 3 }}>
          <Grid container spacing={3}>
            {/* Logo and Change Photo Button */}
            <Grid item xs={12} textAlign="center" position="relative">
              <img
                src={Logo}
                alt="Company Logo"
                style={{ width: "120px", borderRadius: "8px" }}
              />
              <IconButton
                aria-label="change photo"
                color="primary"
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <Edit />
              </IconButton>
            </Grid>

            {/* Company Details */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Company Name
                  </Typography>
                  <Typography variant="body2">
                    PT. Padepokan Tujuh Sembilan
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Founder
                  </Typography>
                  <Typography variant="body2">?</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Founded at
                  </Typography>
                  <Typography variant="body2">2010</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Phone
                  </Typography>
                  <Typography variant="body2">(022) 20505455</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Email Address
                  </Typography>
                  <Typography variant="body2">
                    hcpadepokan79@gmail.com
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Address
                  </Typography>
                  <Typography variant="body2">
                    Gg. Terasana No.6A, Pasir Kaliki, Kec. Cicendo
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Province
                  </Typography>
                  <Typography variant="body2">Jawa Barat</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    City
                  </Typography>
                  <Typography variant="body2">Bandung</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Zip Code
                  </Typography>
                  <Typography variant="body2">40171</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Joining Date
                  </Typography>
                  <Typography variant="body2">June 20, 2024</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Edit Information Button */}
            <Grid item xs={12} textAlign="right">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                size="medium"
              >
                Edit Information
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default CompanyDetail;
