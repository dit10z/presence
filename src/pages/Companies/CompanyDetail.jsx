import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  styled,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import Logo from "../../assets/logo.png";
import ModalChangeCompanyLogo from "../../components/Modal/ModalChangeLogoCompany";

const TypographyHead = styled(Typography)(({ theme }) => ({
  fontWeight: 300, // Light weight
  fontFamily: "Inter, sans-serif", // Inter font family
  color: "#A2A1A8", // Custom color
}));

const TypographyBody = styled(Typography)(({ theme }) => ({
  fontWeight: 300, // Light weight
  fontFamily: "Inter, sans-serif",
}));

const CompanyDetail = () => {
  const[modalChangeCompanyLogo, setModalChangeCompanyLogo] = useState(false);
 
  const handleModalChangeCompanyLogoOpen = () => {
    setModalChangeCompanyLogo(!modalChangeCompanyLogo);
  }
  const handleModalChangeCompanyLogoClose = () => {
    setModalChangeCompanyLogo(false);
  };

  return (
    <Box display="flex" flexDirection="row" minHeight="100vh">
      {/* Main Content */}
      <Box flex={1} padding={4}>
        <Card sx={{ marginTop: 3, padding: 3 }}>
          <Grid container spacing={3}>
            {/* Logo and Change Photo Button */}
            <Grid item xs={12} textAlign="start">
              <Box
                display="inline-flex"
                alignItems="center"
                position="relative"
              >
                <img
                  src={Logo}
                  alt="Company Logo"
                  style={{ width: "300px", borderRadius: "8px" }}
                />
                <IconButton onClick={handleModalChangeCompanyLogoOpen}>
                      <img src="/mock/image-edit.svg" alt="edit icon" />
                </IconButton>
              </Box>
              <Divider sx={{ marginY: 2 }} />
            </Grid>

            {/* Company Details */}
            <Grid item xs={12} sx={{ marginY: 2 }}>
              <Grid container spacing={4} sx={{ marginX: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Company Name</TypographyHead>
                  <TypographyBody variant="body1">
                    PT. Padepokan Tujuh Sembilan
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Founder
                  </TypographyHead>
                  <TypographyBody variant="body1">?</TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Founded at
                  </TypographyHead>
                  <TypographyBody variant="body1">2010</TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Phone
                  </TypographyHead>
                  <TypographyBody variant="body1">
                    (022) 20505455
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Email Address
                  </TypographyHead>
                  <TypographyBody variant="body1">
                    hcpadepokan79@gmail.com
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Address
                  </TypographyHead>
                  <TypographyBody variant="body1">
                    Gg. Terasana No.6A, Pasir Kaliki, Kec. Cicendo
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Province
                  </TypographyHead>
                  <TypographyBody variant="body1">Jawa Barat</TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    City
                  </TypographyHead>
                  <TypographyBody variant="body1">Bandung</TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Zip Code
                  </TypographyHead>
                  <TypographyBody variant="body1">40171</TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2" fontWeight="bold">
                    Joining Date
                  </TypographyHead>
                  <TypographyBody variant="body1">June 20, 2024</TypographyBody>
                </Grid>
              </Grid>
            </Grid>

            {/* Edit Information Button */}
            <Grid item xs={12} sx={{ marginX: 6 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<img src="/mock/edit-icon.svg" alt="edit icon" />}
                size="medium"
              >
                Edit Information
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>

      <ModalChangeCompanyLogo
        open={modalChangeCompanyLogo}
        onClose={handleModalChangeCompanyLogoClose}
        idCompany={companyDetail.id_company}
        title="Change Company Photo"
      />
    </Box>
  );
};

export default CompanyDetail;
