import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  width: "750px", // Adjust the width according to your design
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const FormField = styled(TextField)({
  width: "100%",
});

const FormFieldDate = styled(DatePicker)({
  width: "100%",
});

const ModalAddNewCompany = ({ open, onClose }) => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    joiningDate: null,
  });

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    setCompanyDetails({
      ...companyDetails,
      joiningDate: newValue,
    });
  };

  const handleAdd = () => {
    console.log(companyDetails); // Replace with actual submission logic
    onClose();
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6" mb={8}>
          Add New Company
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormField
              label="Company Name"
              variant="outlined"
              name="companyName"
              value={companyDetails.companyName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Email Address"
              variant="outlined"
              name="email"
              value={companyDetails.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Phone"
              variant="outlined"
              name="phone"
              value={companyDetails.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="Address"
              variant="outlined"
              name="address"
              value={companyDetails.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="State"
              variant="outlined"
              name="state"
              value={companyDetails.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="City"
              variant="outlined"
              name="city"
              value={companyDetails.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Zip Code"
              variant="outlined"
              name="zipCode"
              value={companyDetails.zipCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormFieldDate
              label="Joining Date"
              variant="outlined"
              name="joiningDate"
              value={companyDetails.joiningDate}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CalendarTodayIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Box mt={6} display="flex" justifyContent="flex-end">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ marginRight: 1 }}
            color="primary"
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalAddNewCompany;
