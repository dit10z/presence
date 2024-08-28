import React from "react";
import { Box, Typography, IconButton, styled } from "@mui/material";
import { Description } from "@mui/icons-material";

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

const CustomFileInput = ({
  label,
  file,
  onChange,
  error,
  onDrop,
  onDragOver,
}) => {
  return (
    <FileUploadBox
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => document.getElementById("file-upload").click()}
    >
      <input
        type="file"
        style={{ display: "none" }}
        id="file-upload"
        accept=".jpg,.png"
        onChange={onChange}
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
        {label ||
          "Drag 'n' drop .jpg or .png file here, or click to select file"}
      </Typography>
      {file && (
        <SelectedFileBox>
          <Description sx={{ marginRight: "8px" }} />
          <Typography variant="body2">{file.name}</Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onChange({ target: { files: [] } }); // Reset the file input
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        </SelectedFileBox>
      )}
      {error && (
        <Typography variant="body2" color="error" mt={1}>
          {error}
        </Typography>
      )}
    </FileUploadBox>
  );
};

export default CustomFileInput;
