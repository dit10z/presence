import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import CustomTabs from "../../components/CustomTabs";
import EditAdminForm from "../../forms/Administrator/EditAdminForm";
import ChangePasswordAdminForm from "../../forms/Administrator/ChangePasswordAdmin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

const EditAdmin = (open, onClose, adminData, companyData) => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const formik = useFormik({
    initialValues: {
      firstname: adminData?.first_name || "",
      lastname: adminData?.last_name || "",
      email: adminData?.email || "",
      username: adminData?.username || "",
      idcompany: adminData?.company?.id_company || "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    enableReinitialize: true, // Important to reinitialize form values when props change
    onSubmit: async (values) => {
      try {
        if (activeTab === 0) {
          const payload = {
            first_name: values.firstname,
            last_name: values.lastname,
            username: values.username,
            email: values.email,
            id_company: values.idcompany,
          };
          await editDataAdmin(adminData.id, payload);
          Swal.fire({
            title: "Success",
            text: "Update Admin Success",
            imageUrl: success,
            imageAlt: "success",
          });
        } else if (activeTab === 1) {
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
    },
  });

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
      onSubmit={tabValue === 0 ? handleSaveAdmin : editPassword}
    >
      <CustomTabs value={tabValue} onChange={handleTabChange} tabs={tabs} />
      {tabValue === 0 && (
        <EditAdminForm
          initialValues={initialValues}
          dataCompanyMaster={dataCompanyMaster}
          onSubmit={handleSaveAdmin}
        />
      )}
      {tabValue === 1 && (
        <ChangePasswordAdminForm
          initialValues={initialValues}
          onSubmit={editPassword}
        />
      )}
    </CustomModal>
  );
};
