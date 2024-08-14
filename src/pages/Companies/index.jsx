import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import ModalAddNewAdmin from "../../components/ModalAddNewAdmin";
import CustomModal from "../../components/CustomModal";

const CompaniesList = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <CustomButton variant="contained" onClick={handleOpen}>
        Open Modal
      </CustomButton>
      {/* <ModalAddNewAdmin
        open={open}
        onClose={handleClose}
        title="My Custom Modal"
      ></ModalAddNewAdmin> */}
      <CustomButton variant="contained" onClick={handleOpen}>
        Open Edit
      </CustomButton>
      <CustomModal open={open} onClose={handleClose} title="Edit"></CustomModal>
    </div>
  );
};

export default CompaniesList;
