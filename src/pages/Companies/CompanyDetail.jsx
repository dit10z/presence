import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  Divider,
  IconButton,
  styled,
  CardMedia,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { detailCompany } from "../../redux/slices/companySlice";
import ChangeLogoCompany from "../../forms/Company/ChangeLogoCompany";
import EditCompanyForm from "../../forms/Company/EditCompanyForm";

const TypographyHead = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontFamily: "Inter, sans-serif",
  color: "#A2A1A8",
}));

const TypographyBody = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontFamily: "Inter, sans-serif",
}));

const CompanyDetail = () => {
  const [modalChangeCompanyLogo, setModalChangeCompanyLogo] = useState(false);
  const [editCompanyModal, setEditCompanyModal] = useState(false);

  const { id_company } = useParams();
  const dispatch = useDispatch();

  const companyDetail = useSelector((state) => state.companies.detail);
  const status = useSelector((state) => state.companies.status);

  useEffect(() => {
    if (id_company) {
      dispatch(detailCompany(id_company));
    }
  }, [id_company, dispatch]);

  const handleModalChangeCompanyLogoOpen = () => {
    setModalChangeCompanyLogo(!modalChangeCompanyLogo);
  };
  const handleModalChangeCompanyLogoClose = () => {
    setModalChangeCompanyLogo(false);
  };

  const handleEditOpen = () => {
    setEditCompanyModal(true);
  };

  const handleEditClose = () => setEditCompanyModal(false);

  if (
    status === true ||
    !companyDetail ||
    Object.keys(companyDetail).length === 0
  ) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box display="flex" flexDirection="row" minHeight="100vh">
      <Box flex={1} padding={4}>
        <Card sx={{ marginTop: 3, padding: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} textAlign="start">
              <Box
                display="inline-flex"
                alignItems="center"
                position="relative"
              >
                <CardMedia
                  component="img"
                  alt="Company Logo"
                  image={
                    companyDetail.company_logo ||
                    "https://via.placeholder.com/300"
                  }
                  sx={{
                    width: 300,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
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
                    {companyDetail.company_name || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Founder</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.founder || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Founded at</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.founded_at
                      ? new Date(companyDetail.founded_at).toLocaleDateString()
                      : "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Phone</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.phone || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Email Address</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.email || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Address</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.address || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">State</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.state || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">City</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.city || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Zip Code</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.zip_code || "N/A"}
                  </TypographyBody>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TypographyHead variant="body2">Joining Date</TypographyHead>
                  <TypographyBody variant="body1">
                    {companyDetail.joining_date
                      ? new Date(
                          companyDetail.joining_date
                        ).toLocaleDateString()
                      : "N/A"}
                  </TypographyBody>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ marginX: 6 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                size="medium"
                onClick={handleEditOpen}
              >
                Edit Information
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>

      <ChangeLogoCompany
        open={modalChangeCompanyLogo}
        onClose={handleModalChangeCompanyLogoClose}
        idCompany={companyDetail.id_company}
        title="Change Company Logo"
      />

      <EditCompanyForm
        open={editCompanyModal}
        onClose={handleEditClose}
        companyId={companyDetail.id_company}
      />
    </Box>
  );
};

export default CompanyDetail;
