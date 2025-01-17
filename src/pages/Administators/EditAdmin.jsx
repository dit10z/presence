import React, { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
import CustomTabs from "../../components/CustomTabs";
import EditAdminForm from "../../forms/Administrator/EditAdminForm";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CustomButton from "../../components/CustomButton";
import ChangePasswordAdmin from "../../forms/Administrator/ChangePasswordAdmin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import validationSchema from "../../validation/adminValidation";
import Swal from "sweetalert2";
import { Formik, Form, useFormik } from "formik";
// import { editDataAdmin, editPassword } from "../../services/api/adminService";
// import { editDataAdmin, } from "../../services/api/adminService";
import {
  fetchEditDataAdmin,
  fetchEditPassword,
} from "../../redux/slices/adminsSlice";
import { styled } from "@mui/system";
import success from "../../../public/icons/success.png";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
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
const EditAdmin = ({ open, onClose, adminData, companyData }) => {
  const [tabValue, setTabValue] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [idAdmin, setIdAdmin] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const dispatch = useDispatch();

  // const handleSubmit = async () => {
  //   try {
  //     if (tabValue === 0) {
  //       // Update admin details
  //       // console.log("values handleSubmit", values);
  //       state.admins.push(action.payload);

  //       const payload = {
  //         first_name: values.first_name,
  //         last_name: values.last_name,
  //         username: values.username,
  //         email: values.email,
  //         id_company: values.idcompany,
  //       };
  //       console.log("values handleSubmit", values);
  //       console.log("adminData handleSubmit", adminData.id);
  //       console.log("payload handleSubmit", payload);
  //       await fetchEditDataAdmin(idAdmin, payload);
  //       Swal.fire({
  //         title: "Success",
  //         text: "Update Admin Success",
  //         imageUrl: success,
  //         imageAlt: "success",
  //       });
  //     } else if (tabValue === 1) {
  //       // Change admin password
  //       console.log("Password", values.password);
  //       await editPassword(adminData.id, values.password);
  //       Swal.fire({
  //         title: "Success",
  //         text: "Update Password Success",
  //         imageUrl: success,
  //         imageAlt: "success",
  //       });
  //     }
  //     // onClose();
  //   } catch (error) {
  //     Swal.fire("Error", "There was an error updating the admin", "error");
  //   }
  // };

  useEffect(() => {
    setInitialValues({
      first_name: adminData?.first_name || "",
      last_name: adminData?.last_name || "",
      email: adminData?.email || "",
      username: adminData?.username || "",
      id_company: adminData?.company?.id_company || "",
    });
    setIdAdmin(adminData.id_admin);
  }, [open, adminData]);

  const handleSaveAdmin = async (values) => {
    // Logic to save admin data
    try {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        id_company: values.idcompany,
      };
      await dispatch(fetchEditDataAdmin({ id: idAdmin, data: payload }));
      Swal.fire({
        title: "Success",
        text: "Update Admin Success",
        imageUrl: success,
        imageAlt: "success",
      });
      onClose();
    } catch (error) {
      Swal.fire("Error", "There was an error updating the admin", "error");
    }
  };

  const editPassword = async (values) => {
    // Logic to edit password
    try {
      await dispatch(
        fetchEditPassword({ id: idAdmin, password: values.password })
      );
      Swal.fire({
        title: "Success",
        text: "Update Password Success",
        imageUrl: success,
        imageAlt: "success",
      });
      onClose();
    } catch (error) {
      Swal.fire("Error", "There was an error updating the password", "error");
    }
  };

  const handleSubmit = (event, values) => {
    event.preventDefault();

    if (tabValue === 0) {
      handleSaveAdmin(values);
    }

    if (tabValue === 1) {
      editPassword(values);
    }
  };

  const tabs = [
    {
      icon: <AccountCircleIcon />,
      label: "Edit Administrator",
    },
    {
      icon: <EditIcon />,
      label: "Change Password",
    },
  ];

  return (
    <Formik
      initialValues={initialValues} // Pass initial values to the form
      dataCompanyMaster={companyData} // Pass company data for the dropdown
      // onSubmit={handleSaveAdmin} // Handle form submission
      validationSchema={validationSchema} // Validation schema for the form
      enableReinitialize={true}
      validateOnBlur={true} // Validate when a field loses focus
      validateOnChange={true} // Validate when a field value changes
    >
      {({ values, handleChange, handleBlur, touched, errors, onSubmit }) => (
        <CustomModal
          open={open}
          onClose={onClose}
          title="Edit Administrator"
          titleButton="Save"
          onSubmit={(e) => handleSubmit(e, values)} // Submit formik form on modal save button click
        >
          <CustomTabs value={tabValue} onChange={handleTabChange} tabs={tabs} />
          {tabValue === 0 ? (
            <Form>
              <EditAdminForm
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                dataCompanyMaster={companyData}
                handleBlur={handleBlur}
              />
            </Form>
          ) : (
            <ChangePasswordAdmin
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              handleBlur={handleBlur}
            />
          )}
        </CustomModal>
      )}
    </Formik>
  );
};

export default EditAdmin;
