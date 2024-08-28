import React, { useState } from "react";
import { Box, Typography, Grid, Tabs, Tab, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Description } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import success from "../../../public/icons/success.png";
import CustomModal from "../../components/CustomModal"; // Import the CustomModal
import {
  changeCompanyLogo,
  detailCompany,
} from "../../redux/slices/companySlice";
import { useFormik } from "formik";
import validationSchema from "../../validation/fileValidation";
import CustomFileInput from "../../components/CustomFileInput";

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
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("company_logo", values.file);

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
    },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    formik.setFieldValue("file", event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onCloseModal = () => {
    formik.resetForm(); // Reset form saat modal ditutup
    onClose(); // dialog ditutup
  };

  return (
    <CustomModal
      open={open}
      onClose={onCloseModal}
      title={title}
      onSubmit={formik.handleSubmit} // Pass the handleSubmit function to the CustomModal
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
            <CustomFileInput
              file={formik.values.file}
              onChange={handleFileChange}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              error={formik.touched.file && formik.errors.file}
            />
            
          </Grid>
        </Grid>
      )}
    </CustomModal>
  );
};

export default ChangeLogoCompany;
