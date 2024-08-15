import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import CustomButton from "../../components/CustomButton";
import CustomDataGrid from "../../components/CustomDataGrid";
import { Add, Delete, Edit, Search, Visibility } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import theme from "../../styles/theme";
import ModalAddNewAdministrator from "../../components/Modal/ModalAddNewAdmin";
import {
  Avatar,
  Paper,
  Box,
  Pagination,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
const rows = [
  {
    id: 1,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 2,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    id: 3,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 4,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    id: 5,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 6,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    id: 7,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 8,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    id: 9,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 10,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    id: 11,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 12,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    id: 13,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 14,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    id: 15,
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    id: 16,
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  // Add more rows as needed
];

const AdminTabel = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalRowCount = 100;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { field: "company", headerName: "Company Name", flex: 1 },
    {
      field: "name",
      headerName: "Administrator Name",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ mr: 2 }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "date", headerName: "Joining Date", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: () => (
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          <IconButton
            aria-label="view"
            onClick={() => navigate("/admin-detail")}
          >
            <Visibility />
          </IconButton>
          <IconButton aria-label="edit">
            <Edit />
          </IconButton>
          <IconButton aria-label="delete">
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <CustomDataGrid
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        searchQuery={searchQuery}
        totalRowCount={totalRowCount}
        hidePagination={true}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <TextField
          select
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
          sx={{ width: 100 }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </TextField>

        <Pagination
          count={Math.ceil(totalRowCount / pageSize)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </>
  );
};
const AdminButton = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [newAdministratorModal, setNewAdministratorModal] = useState(false);
  const handleOpen = () => {
    setNewAdministratorModal(true);
  };
  const handleClose = () => {
    setNewAdministratorModal(false);
  };
  return (
    <Box>
      <Box
        direction="row"
        gap={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box display="flex" alignItems="center" style={{ marginRight: "20px" }}>
          <TextField
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <DatePicker
            label="Date Filter"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <CustomButton
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpen}
          >
            Add New Administrator
          </CustomButton>
        </Stack>
      </Box>
      <ModalAddNewAdministrator
        open={newAdministratorModal}
        onClose={handleClose}
        title="Add"
      ></ModalAddNewAdministrator>
    </Box>
  );
};
const Administrators = () => {
  return (
    <Grid
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"10px"}
      padding={2.5}
    >
      <Box sx={{ p: 3 }}>
        <AdminButton />
        <AdminTabel />
      </Box>
    </Grid>
  );
};

export default Administrators;
