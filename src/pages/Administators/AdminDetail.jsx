import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  Button,
  Typography,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
// import TabPanel from "@mui/lab/TabPanel";
import CustomButton from "../../components/CustomButton";
import { Email, Business, Edit } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import theme from "../../styles/theme";
import ModalEditAdmin from "../../components/Modal/ModalEditAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAdminDetail } from "../../redux/slices/adminsSlice";
import ChangePhotoAdmin from "../../forms/Administrator/ChangePhotoAdmin";
import InfoDisplay from "../../components/InfoDisplay";
import EditAdmin from "./EditAdmin";
import { fetchCompanies } from "../../redux/slices/companySlice";

const AdminDetail = () => {
  const [modalEditAdmin, setModalEditAdmin] = useState(false);
  const [modalChangePhotoAdmin, setModalChangePhotoAdmin] = useState(false);
  const dispatch = useDispatch();
  const { idAdmin } = useParams();
  const adminDetail = useSelector((state) => state.admin.adminDetail);
  const companies = useSelector((state) => state.companies.companies);

  useEffect(() => {
    if (idAdmin) {
      dispatch(fetchAdminDetail(idAdmin));
    }
  }, [dispatch, idAdmin]);

  useEffect(() => {
    if (open) {
      dispatch(fetchCompanies());
    }
  }, [open, dispatch]);
  const handleModalEditAdminOpen = () => {
    setModalEditAdmin(!modalEditAdmin);
  };
  const handleModalEditAdminClose = () => {
    setModalEditAdmin(false);
  };
  const handleModalChangePhotoAdminOpen = () => {
    setModalChangePhotoAdmin(!modalChangePhotoAdmin);
  };
  const handleModalChangePhotoAdminClose = () => {
    setModalChangePhotoAdmin(false);
  };

  if (!adminDetail) {
    return <div>No Data...</div>;
  }

  return (
    <Grid
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"10px"}
      padding={2.5}
    >
      <Box>
        <Box>
          <Grid
            direction="row"
            gap={1}
            style={{
              display: "flex",
              justifyContent: "space-between",
              // flex: "1 0 auto",
            }}
          >
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                alt="foto profil"
                image={
                  adminDetail.profile_picture ||
                  "https://via.placeholder.com/100"
                }
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <CardContent style={{ flex: "1" }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography component="div" variant="h6">
                    {`${adminDetail.first_name} ${adminDetail.last_name}`}
                    <IconButton onClick={handleModalChangePhotoAdminOpen}>
                      <img src="/mock/image-edit.svg" alt="edit icon" />
                    </IconButton>
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1} gap={1}>
                  <Business />
                  <Typography variant="body2">
                    {adminDetail.company?.company_name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1} gap={1}>
                  <Email />
                  <Typography variant="body2">{adminDetail.email}</Typography>
                </Box>
              </CardContent>
              <CardActions style={{ marginRight: "10px" }}>
                <CustomButton
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  size="medium"
                  onClick={handleModalEditAdminOpen}
                >
                  Edit Profile
                </CustomButton>
              </CardActions>
            </Card>
          </Grid>
        </Box>
        <Box sx={{ width: "100%", typography: "h6" }}>
          <TabContext value="1">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList aria-label="lab API tabs example">
                <Tab label="Data Administrator" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <InfoDisplay
                  label="First Name"
                  value={adminDetail.first_name}
                  underline
                />
                <InfoDisplay
                  label="Last Name"
                  value={adminDetail.last_name}
                  underline
                />
                <InfoDisplay
                  label="Username"
                  value={adminDetail.username}
                  underline
                />
                <InfoDisplay
                  label="Email Address"
                  value={adminDetail.email}
                  underline
                />
                <InfoDisplay
                  label="Company Origin"
                  value={adminDetail.company?.company_name}
                  underline
                />
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
      {/* <ModalEditAdmin
        open={modalEditAdmin}
        onClose={handleModalEditAdminClose}
        title="Edit Profile"
        adminId={adminDetail.id_admin}
      /> */}
      <EditAdmin
        open={modalEditAdmin}
        onClose={handleModalEditAdminClose}
        adminData={adminDetail}
        companyData={companies}
      />

      <ChangePhotoAdmin
        open={modalChangePhotoAdmin}
        onClose={handleModalChangePhotoAdminClose}
        idAdmin={adminDetail.id_admin}
        title="Change Admin Photo"
      />
    </Grid>
  );
};

export default AdminDetail;
