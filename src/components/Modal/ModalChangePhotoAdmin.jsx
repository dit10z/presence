import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomButton from "../CustomButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Description } from "@mui/icons-material";
import { changeAdminPhoto } from "../../redux/actions";
import { useDispatch } from "react-redux";

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
  backgroundColor: "#f0f0f0", // Muted background color
  padding: "8px 12px",
  borderRadius: "20px",
  marginTop: "16px",
});

const ModalChangePhotoAdmin = ({ open, onClose }) => {
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

  const handleSubmit = () => {
    let errorMessage = "";

     // Validasi jika blm ada file yg dipilih
     if (!selectedFile) {
        errorMessage = "Field must not be empty";
      } else if (selectedFile.size > 2 * 1024 * 1024) { // Validasi ukuran file (maks 2MB)
        errorMessage = "Max photo's size is 2MB";
      } else if (!["image/jpeg", "image/png"].includes(selectedFile.type)) { // Validasi format file
        errorMessage = "Format must be .jpg/.jpeg/.png";
      }

    // Jika ada error, set pesan error dan tampilkan
    if (errorMessage) {
      setValidationError(errorMessage);
      return;
    }

    if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      dispatch(changeAdminPhoto({ id_admin, photo: base64String }));
    };
    reader.readAsDataURL(selectedFile);
  }
  setValidationError("") // reset error kl gaada error
  onCloseModal();
};

  const onCloseModal = () => {
    setSelectedFile(null); // file yg dipilih terhapus
    setValidationError(""); // reset pesan error
    onClose(); // dialog ditutup
  }

  return (
    <StyledModal open={open} onClose={onCloseModal}>
      <ModalContent>
        <Typography variant="h6" mb={3}>
          Change Admin Photo
        </Typography>
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
        <Box mt={10} display="flex" justifyContent="flex-end">
          <CustomButton
            onClick={onCloseModal}
            variant="outlined"
            sx={{ marginRight: 1 }}
            color="button"
          >
            Cancel
          </CustomButton>
          <CustomButton 
            variant="contained" 
            color="button" 
            text="white"
            onClick={handleSubmit}
          >
            Save
          </CustomButton>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalChangePhotoAdmin;
