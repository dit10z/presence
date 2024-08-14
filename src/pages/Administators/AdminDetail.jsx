import React from "react";
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
import Grid from "@mui/material/Grid2";
const AdminDetail = () => {
  return (
    <div>
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
                image="https://via.placeholder.com/100" // Replace with your image URL
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
                    Darlene Robertson
                    <IconButton>
                      <img src="/mock/image-edit.svg" alt="edit icon" />
                    </IconButton>
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1} gap={1}>
                  <Business />
                  <Typography variant="body2">Padepokan 79</Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1} gap={1}>
                  <Email />
                  <Typography variant="body2">darlene@gmail.com</Typography>
                </Box>
              </CardContent>
              <CardActions style={{ marginRight: "10px" }}>
                <CustomButton
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  size="medium"
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    defaultValue="Darlene"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    defaultValue="Robertson"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    defaultValue="darlenekrobertson79"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    defaultValue="darlene@gmail.com"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Origin"
                    variant="outlined"
                    defaultValue="Padepokan79"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </div>
  );
};

export default AdminDetail;
