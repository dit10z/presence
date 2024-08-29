import React, { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
import CustomTabs from "../../components/CustomTabs";
import EditAdminForm from "../../forms/Administrator/EditAdminForm";
import ChangePasswordAdmin from "../../forms/Administrator/ChangePasswordAdmin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import validationSchema from "../../validation/adminValidation";
import Swal from "sweetalert2";
const EditAdmin = ({ open, onClose, adminData, companyData, setAdminData }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (values, tabValue) => {
    try {
      if (tabValue === 0) {
        // Update admin details
        state.admins.push(action.payload);

        const payload = {
          first_name: values.firstname,
          last_name: values.lastname,
          username: values.username,
          email: values.email,
          id_company: values.idcompany,
        };
        console.log("values", values);
        console.log("payload", payload);
        // await editDataAdmin(adminData.id, payload);
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
      onClose();
    } catch (error) {
      Swal.fire("Error", "There was an error updating the admin", "error");
    }
  };

  const initialValues = {
    firstname: adminData?.first_name || "",
    lastname: adminData?.last_name || "",
    email: adminData?.email || "",
    username: adminData?.username || "",
    idcompany: adminData?.company?.id_company || "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    console.log("Modal sudah ditutup");
    
  }, [onClose]);

  const handleSaveAdmin = () => {
    // Logic to save admin data

    console.log("Admin data saved");
  };

  const editPassword = () => {
    // Logic to edit password
    console.log("Password edited");
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
        <EditAdminForm
          initialValues={dataAdmin} // Pass initial values to the form
          setDataAdmin=
          dataCompanyMaster={companyData} // Pass company data for the dropdown
          onSubmit={handleSubmit} // Handle form submission
          validationSchema={validationSchema} // Validation schema for the form
        />
      )}
      {tabValue === 1 && (
        <ChangePasswordAdmin
          initialValues={initialValues} // Pass initial values for the password form
          onSubmit={handleSubmit} // Handle password change form submission
          validationSchema={validationSchema} // Validation schema for password
        />
      )}
    </CustomModal>
  );
};

export default EditAdmin;
