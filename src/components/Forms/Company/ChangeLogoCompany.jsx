import React, { useState } from "react";
import { Box, Typography, Grid, Tabs, Tab, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CustomButton from "../CustomButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Description } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  changeCompanyLogo,
  detailCompany,
} from "../../redux/slices/companySlice";
import Swal from "sweetalert2";
import success from "../../assets/icons/success.png";
import CustomModal from "../CustomModal"; // Import the CustomModal

const FileUploadBox = styled(Box)({
  border: "2px dashed #0078D7",
  borderRadius: "5px",
  textAlign: "center",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
  backgroundColor: "#f9f9f9",
});

const SelectedFileBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  padding: "8px 12px",
  borderRadius: "20px",
  marginTop: "16px",
});

const ChangeLogoCompany = ({ open, onClose, idCompany, title }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    let errorMessage = "";

    // Validation
    if (!selectedFile) {
      errorMessage = "Field must not be empty";
    } else if (selectedFile.size > 2 * 1024 * 1024) {
      errorMessage = "Max photo's size is 2MB";
    } else if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      errorMessage = "Format must be .jpg/.jpeg/.png";
    }

    // Show error if validation fails
    if (errorMessage) {
      setValidationError(errorMessage);
      return;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append("company_logo", selectedFile);

      try {
        await dispatch(changeCompanyLogo({ idCompany, formData })).unwrap();
        Swal.fire({
          title: "Success",
          text: "Change Company Logo Success",
          imageUrl: success,
          imageAlt: "success",
        });
        await dispatch(detailCompany(idCompany));
        onCloseModal();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to change photo. Please try again.",
          icon: "error",
        });
      }
    }

    setValidationError(""); // Reset error message
    onCloseModal();
  };

  const onCloseModal = () => {
    setSelectedFile(null); // Reset selected file
    setValidationError(""); // Reset validation error
    onClose(); // Close modal
  };

  return (
    <CustomModal
      open={open}
      onClose={onCloseModal}
      title={title}
      onSubmit={handleSubmit} // Pass the handleSubmit function to the CustomModal
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label="Choose File"
          icon={<UploadFileIcon />}
          iconPosition="start"
        />
      </Tabs>
      {activeTab === 0 && (
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12}>
            <FileUploadBox onDrop={handleDrop} onDragOver={handleDragOver}>
              <input
                type="file"
                style={{ display: "none" }}
                id="file-upload"
                accept=".jpg,.png"
                onChange={handleFileChange}
              />
              <Typography
                mb={3}
                variant="body2"
                sx={{
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(0, 0, 0, 0.6)", // Muted color
                }}
              >
                Drag 'n' drop .jpg or .png file here, or click to select file
              </Typography>
              <label htmlFor="file-upload">
                <IconButton
                  component="span"
                  size="large"
                  sx={{
                    width: 56,
                    height: 56,
                  }}
                  color="primary"
                >
                  <UploadFileIcon sx={{ fontSize: 40 }} /> {/* Larger icon */}
                </IconButton>
              </label>
              {selectedFile && (
                <SelectedFileBox>
                  <Description sx={{ marginRight: "8px" }} />
                  <Typography variant="body2">{selectedFile.name}</Typography>
                </SelectedFileBox>
              )}
            </FileUploadBox>
            {validationError && (
              <Typography variant="body2" color="error" mt={1}>
                {validationError}
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </CustomModal>
  );
};

export default ChangeLogoCompany;
