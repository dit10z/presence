import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomButton from "../CustomButton";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  width: "750px", // Increase width from 500px to 600px
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const FormField = styled(TextField)({
  width: "100%",
});

const ModalAddNewAdmin = ({ open, onClose }) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6" mb={8}>
          Add New Administrator
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField label="First Name" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <FormField label="Last Name" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <FormField label="Username" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <FormField label="Email Address" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <FormField label="Password" type="password" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Confirm Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              select
              label="Company Origin"
              variant="outlined"
              defaultValue=""
            >
              <MenuItem value="company1">Company 1</MenuItem>
              <MenuItem value="company2">Company 2</MenuItem>
              <MenuItem value="company3">Company 3</MenuItem>
            </FormField>
          </Grid>
        </Grid>
        <Box mt={6} display="flex" justifyContent="flex-end">
          <CustomButton
            onClick={onClose}
            variant="outlined"
            sx={{ marginRight: 1 }}
            color="button"
          >
            Cancel
          </CustomButton>
          <CustomButton variant="contained" color="primary" text="white">
            Add
          </CustomButton>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalAddNewAdmin;
