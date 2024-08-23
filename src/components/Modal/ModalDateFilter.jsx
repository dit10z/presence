import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";

const DateFilterModal = ({
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
    return date ? date.toISOString().split("T")[0] : "";
  };

  const handleApply = () => {
    console.log(">>>", temporalEndDate);
    setStartDate(formatDate(temporalStartDate));
    setEndDate(formatDate(temporalEndDate));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Date Filter
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <DatePicker
              label="Start date"
              // value={startDate}
              onChange={(e) => setTemporalStartDate(e)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography align="center">—</Typography>
          </Grid>
          <Grid item xs={5} sx={{ paddingRight: 10 }}>
            <DatePicker
              label="End date"
              // value={endDate}
              onChange={(e) => setTemporalEndDate(e)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined" sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DateFilterModal;
