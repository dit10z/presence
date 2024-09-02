import React, { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
import CustomTabs from "../../components/CustomTabs";
import EditAdminForm from "../../forms/Administrator/EditAdminForm";
import ChangePasswordAdmin from "../../forms/Administrator/ChangePasswordAdmin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import validationSchema from "../../validation/adminValidation";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { editDataAdmin, editPassword } from "../../services/api/adminService";
// import { editDataAdmin, } from "../../services/api/adminService";

const EditAdmin = ({ open, onClose, adminData, companyData, setAdminData }) => {
  console.log("adminData", adminData);
  const [tabValue, setTabValue] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [idAdmin, setIdAdmin] = useState("");
  console.log("hasil initial value", initialValues);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      if (tabValue === 0) {
        // Update admin details
        // console.log("values handleSubmit", values);
        state.admins.push(action.payload);

        const payload = {
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
          email: values.email,
          id_company: values.idcompany,
        };
        console.log("values handleSubmit", values);
        console.log("adminData handleSubmit", adminData.id);
        console.log("payload handleSubmit", payload);
        await editDataAdmin(idAdmin, payload);
        Swal.fire({
          title: "Success",
          text: "Update Admin Success",
          imageUrl: success,
          imageAlt: "success",
        });
      } else if (tabValue === 1) {
        // Change admin password
        console.log("Password", values.password);
        await editPassword(adminData.id, values.password);
        Swal.fire({
          title: "Success",
          text: "Update Password Success",
          imageUrl: success,
          imageAlt: "success",
        });
      }
      // onClose();
    } catch (error) {
      Swal.fire("Error", "There was an error updating the admin", "error");
    }
  };

  useEffect(() => {
    setInitialValues({
      first_name: adminData?.first_name || "",
      last_name: adminData?.last_name || "",
      email: adminData?.email || "",
      username: adminData?.username || "",
      id_company: adminData?.company?.id_company || "",
      password: "",
      confirmPassword: "",
    });
    setIdAdmin(adminData.id);
  }, [open, adminData]);

  console.log("initialValues", initialValues);
  const handleSaveAdmin = async () => {
    // Logic to save admin data

    try {
      state.admins.push(action.payload);

      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        id_company: values.idcompany,
      };
      console.log("values handleSubmit", values);
      console.log("adminData handleSubmit", adminData.id);
      console.log("payload handleSubmit", payload);
      await editDataAdmin(idAdmin, payload);
      Swal.fire({
        title: "Success",
        text: "Update Admin Success",
        imageUrl: success,
        imageAlt: "success",
      });

      console.log("Admin data saved");
    } catch (error) {
      Swal.fire("Error", "There was an error updating the admin", "error");
    }
  };

  const editPassword = async () => {
    // Logic to edit password

    console.log("Password edited");
    try {
      console.log("Password", values.password);
      await editPassword(adminData.id, values.password);
      Swal.fire({
        title: "Success",
        text: "Update Password Success",
        imageUrl: success,
        imageAlt: "success",
      });
    } catch (error) {
      Swal.fire("Error", "There was an error updating the password", "error");
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
    <CustomModal
      open={open}
      onClose={onClose}
      title="Edit Administrator"
      titleButton="Save"
      onSubmit={handleSubmit} // Submit formik form on modal save button click
    >
      <CustomTabs value={tabValue} onChange={handleTabChange} tabs={tabs} />
      {tabValue === 0 && (
        <Formik
          initialValues={initialValues} // Pass initial values to the form
          dataCompanyMaster={companyData} // Pass company data for the dropdown
          onSubmit={() => handleSaveAdmin(values, tabValue)} // Handle form submission
          validationSchema={validationSchema} // Validation schema for the form
          enableReinitialize={true}
        >
          {({ values, handleChange, touched, errors }) => (
            <EditAdminForm
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              dataCompanyMaster={companyData}
              onSubmit={() => handleSubmit(values, tabValue)}
            />
          )}
        </Formik>
      )}
      {tabValue === 1 && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => editPassword(values, tabValue)}
        >
          {({ values, handleChange, touched, errors }) => (
            <ChangePasswordAdmin
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              // onSubmit={() => handleSubmit(values, tabValue)}
            />
          )}
        </Formik>
      )}
    </CustomModal>
  );
};

export default EditAdmin;
