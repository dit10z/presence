import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from "../../assets/icons/success.png";
import CustomButton from "../../components/CustomButton";
import CustomDataGrid from "../../components/CustomDataGrid";
import {
  Add,
  Delete,
  Edit,
  Search,
  Visibility,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import theme from "../../styles/theme";
import ModalAddNewAdministrator from "../../components/Modal/ModalAddNewAdmin";
import ModalEditAdmin from "../../components/Modal/ModalEditAdmin";
import ModalDateFilter from "../../components/Modal/ModalDateFilter";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Swal from "sweetalert2";
// import { getAllAdmins, deleteDataAdmin } from "../../services/api/adminService";
import { fetchAllAdmins } from "../../redux/slices/adminsSlice";
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

const Administrators = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, status, pagination } = useSelector((state) => state.admin);

  // State management
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [newAdministratorModal, setNewAdministratorModal] = useState(false);
  const [openDateFilter, setOpenDateFilter] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [row, setRow] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const totalRowCount = 100;

  const handleOpenModalEdit = (id) => {
    setSelectedId(id);
    setOpenModalEdit(true);
  };
  const handleModalEditClose = () => setOpenModalEdit(false);
  const handleOpenDateFilter = () => {
    setStartDate({});
    setEndDate({});
    setOpenDateFilter(true);
  };
  const handleCloseDateFilter = () => setOpenDateFilter(false);
  const handleOpen = () => setNewAdministratorModal(true);
  const handleClose = () => setNewAdministratorModal(false);

  const handleSearch = (e) => {
    console.log("SEARCH QUERY", e);
    setSearchQuery(e);
    console.log(e);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(1);
  };

  function extractDate(createdDate) {
    const date = new Date(createdDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // const fetchDataAdmin = async (
  //   searchQuery,
  //   sortBy,
  //   pageSize,
  //   page,
  //   startDate,
  //   endDate
  // ) => {
  //   try {
  //     const response = await getAllAdmins(
  //       searchQuery,
  //       sortBy,
  //       pageSize,
  //       page,
  //       startDate,
  //       endDate
  //     );
  //     const transformedData = response.data.data.map((admin) => ({
  //       id: admin.id_admin,
  //       company_name: admin.company.company_name,
  //       fullname: `${admin.first_name} ${admin.last_name}`,
  //       email: admin.email,
  //       profile_picture: admin.profile_picture,
  //       created_date: extractDate(admin.created_day),
  //     }));
  //     setRow(transformedData);
  //     setTotal(response.data.meta.total);
  //     console.log("total", response.data.meta.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    dispatch(
      fetchAllAdmins(searchQuery, sortBy, pageSize, page, startDate, endDate)
    );
    console.log("data", data);
  }, [dispatch, searchQuery, sortBy, pageSize, page, startDate, endDate]);

  useEffect(() => {
    setTotal(pagination.total);
  }, [pagination]);

  const transformedData =
    data?.map((admin) => ({
      id: admin.id_admin,
      company_name: admin.company.company_name,
      fullname: `${admin.first_name} ${admin.last_name}`,
      email: admin.email,
      profile_picture: admin.profile_picture,
      created_date: admin.created_day
        ? dayjs(admin.created_day).format("YYYY-MM-DD")
        : "N/A",
    })) || [];

  const handleDelete = async (id) => {
    console.log("id", id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteDataAdmin(id); // Memanggil API deleteAdmin dengan ID admin yang akan dihapus
        Swal.fire({
          title: "Deleted",
          text: "Delete Admin Success",
          imageUrl: success,
          imageAlt: "success",
        });
        // Refresh data admin setelah berhasil menghapus
        await fetchDataAdmin(
          searchQuery,
          sortBy,
          pageSize,
          page,
          startDate,
          endDate
        );
      } catch (error) {
        console.error("Error deleting admin:", error);
        Swal.fire(
          "Error",
          "There was an error deleting the administrator.",
          "error"
        );
      }
    }
  };
  const columns = [
    { field: "company_name", headerName: "Company Name", flex: 1 },
    {
      field: "fullname",
      headerName: "Administrator Name",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", paddingTop: "5px" }}>
          <Avatar sx={{ mr: 2 }} src={params.row.profile_picture} />
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
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          {/* {console.log("log param", params.row.id)} */}
          <IconButton
            aria-label="view"
            onClick={() => navigate(`/admin-detail/${params.row.id}`)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handleOpenModalEdit(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Grid
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"10px"}
      padding={2.5}
    >
      <Box sx={{ p: 3 }}>
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
          <Box
            display="flex"
            alignItems="center"
            style={{ marginRight: "20px" }}
          >
            <TextField
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
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
            <CustomButton
              variant="contained"
              color="white"
              startIcon={<CalendarMonthOutlined />}
              onClick={handleOpenDateFilter}
            >
              Date Filter
            </CustomButton>
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

        <CustomDataGrid
          columns={columns}
          rows={transformedData}
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
            onChange={handleChangeRowsPerPage}
            sx={{ width: 100 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </TextField>

          <Pagination
            count={Math.ceil(total / pageSize)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>

        <ModalAddNewAdministrator
          open={newAdministratorModal}
          onClose={handleClose}
          title="Add"
        />

        <ModalDateFilter
          open={openDateFilter}
          onClose={handleCloseDateFilter}
          title="Date Filter"
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          // handleApply={handleApplyDateFilter}
        />
        <ModalEditAdmin
          open={openModalEdit}
          onClose={handleModalEditClose}
          title="edit"
          adminId={selectedId}
        />
      </Box>
    </Grid>
  );
};

export default Administrators;
