import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import CustomButton from "../../components/CustomButton";
import CustomDataGrid from "../../components/CustomDataGrid";
import { Add, Delete, Edit, Search, Visibility } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import theme from "../../styles/theme";
import ModalAddNewAdministrator from "../../components/Modal/ModalAddNewAdmin";
import ModalEditAdmin from "../../components/Modal/ModalEditAdmin";
import { getAllAdmins } from "../../services/apis";
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

const AdminTabel = ({ searchQuery }) => {
  const [openModaledit, setOpenModaledit] = useState(false);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [row, setRow] = useState([]);
  const totalRowCount = 100;

  const handleOpenModaledit = () => {
    setOpenModaledit(true);
  };
  const handleModalEditClose = () => {
    setOpenModaledit(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function extractDate(createdDate) {
    const date = new Date(createdDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  const fetchDataAdmin = async (searchQuery, sortBy, pageSize, page) => {
    try {
      const response = await getAllAdmins(searchQuery, sortBy, pageSize, page);
      console.log(response.data.data);
      const transformedData = response.data.data.map((admin) => ({
        id: admin.id_admin,
        company_name: admin.company.company_name,
        fullname: `${admin.first_name} ${admin.last_name}`,
        email: admin.email,
        profile_picture: admin.profile_picture,
        created_date: extractDate(admin.created_day),
      }));
      setRow(transformedData);
      console.log(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataAdmin(searchQuery, sortBy, pageSize, page);
  }, [searchQuery, sortBy, pageSize, page]);

  // const data = {
  //   company: {
  //     id_company: 3,
  //     company_name: "PT. Padepokan Tujuh Sembilan",
  //   },
  //   id_admin: 1,
  //   profile_picture: "profile_picture.png",
  //   first_name: "John",
  //   last_name: "Doe",
  //   email: "example@example.com",
  //   created_date: "2022-01-01",
  // };

  // const newrows = [
  //   {
  //     id: data.id_admin,
  //     company_name: data.company.company_name,
  //     fullname: `${data.first_name} ${data.last_name}`,
  //     email: data.email,
  //     profile_picture: data.profile_picture,
  //     created_date: data.created_date,
  //   },
  // ];
  const columns = [
    { field: "company_name", headerName: "Company Name", flex: 1 },
    {
      field: "fullname",
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
    { field: "created_date", headerName: "Joining Date", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: () => (
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          <IconButton
            aria-label="view"
            onClick={() => navigate("/admin-detail/")}
          >
            <Visibility />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleOpenModaledit}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete">
            <Delete />
          </IconButton>
          <ModalEditAdmin
            open={openModaledit}
            onClose={handleModalEditClose}
            title="edit"
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <CustomDataGrid
        columns={columns}
        rows={row}
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
const AdminButton = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [newAdministratorModal, setNewAdministratorModal] = useState(false);
  const handleOpen = () => {
    setNewAdministratorModal(true);
  };
  const handleClose = () => {
    setNewAdministratorModal(false);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
    console.log(e.target.value);
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
            onChange={(e) => handleSearch(e)}
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
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Grid
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"10px"}
      padding={2.5}
    >
      <Box sx={{ p: 3 }}>
        <AdminButton onSearch={setSearchQuery} />
        <AdminTabel searchQuery={searchQuery} />
      </Box>
    </Grid>
  );
};

export default Administrators;
