import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import CustomInput from "../components/CustomInput";
import CustomModal from "../components/CustomModal";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

const DateFilter = ({
  open,
  onClose,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [temporalStartDate, setTemporalStartDate] = useState({});
  const [temporalEndDate, setTemporalEndDate] = useState({});

  const formatDate = (date) => {
    return date ? dayjs(date).format("YYYY-MM-DD") : "";
  };

  const handleApply = (e) => {
    e.preventDefault();
    console.log("startdate", temporalStartDate);
    setStartDate(formatDate(temporalStartDate));
    console.log("startdate", startDate);
    setEndDate(formatDate(temporalEndDate));
    onClose();
  };

  const handleCancel = () => {
    setTemporalStartDate(null);
    setTemporalEndDate(null);
    setStartDate("");
    setEndDate("");
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={handleCancel}
      title="Date Filter"
      titleButton="Apply"
      onSubmit={handleApply}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <CustomInput
            label="Start date"
            type="date"
            onChange={(e) => setTemporalStartDate(e)}
          />
        </Grid>
        <Grid item xs={2} textAlign="center">
          <Typography align="center">—</Typography>
        </Grid>
        <Grid item xs={5}>
          <CustomInput
            label="End date"
            type="date"
            onChange={(e) => setTemporalEndDate(e)}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default DateFilter;
