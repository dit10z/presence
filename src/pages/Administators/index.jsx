import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from "../../../public/icons/success.png";
import CustomButton from "../../components/CustomButton";
import CustomDataGrid from "../../components/CustomDataGrid";
import {
  Add,
  Delete,
  Edit,
  Search,
  CalendarMonthOutlined,
  Visibility,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import theme from "../../styles/theme";
import DateFilter from "../../forms/DateFilter";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  fetchAllAdmins,
  fetchAdminDetail,
} from "../../redux/slices/adminsSlice";
import {
  Avatar,
  Box,
  Pagination,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import AddAdminForm from "../../forms/Administrator/AddAdminForm";
import { fetchCompanies } from "../../redux/slices/companySlice";
import EditAdmin from "../Administators/EditAdmin";

const Administrators = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, pagination } = useSelector((state) => state.admin);
  const companies = useSelector((state) => state.companies.companies);

  // State management
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [newAdministratorModal, setNewAdministratorModal] = useState(false);
  const [openDateFilter, setOpenDateFilter] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [total, setTotal] = useState(0);
  const [transformData, setTransformData] = useState([]);

  const handleOpenModalEdit = (id) => {
    setOpenModalEdit(true);
    dispatch(fetchAdminDetail(id))
      .unwrap()
      .then((data) => {
        setSelectedData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch admin details:", error);
      });
  };

  const handleModalEditClose = () => setOpenModalEdit(false);
  const handleOpenDateFilter = () => setOpenDateFilter(true);
  const handleCloseDateFilter = () => setOpenDateFilter(false);
  const handleOpen = () => setNewAdministratorModal(true);
  const handleClose = () => setNewAdministratorModal(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(1);
  };

  useEffect(() => {
    console.log("Sebelum Kirim", pageSize);
    dispatch(
      fetchAllAdmins({
        sortBy,
        pageSize,
        page,
        startDateJoined: startDate,
        endDateJoined: endDate,
      })
    ).then((responseData) => {
      console.log("Hasil Dispatch", responseData);
      setTransformData(
        responseData?.payload?.data.map((admin) => ({
          id: admin.id_admin,
          company_name: admin.company.company_name,
          fullname: `${admin.first_name} ${admin.last_name}`,
          email: admin.email,
          profile_picture: admin.profile_picture,
          created_date: admin.created_day
            ? dayjs(admin.created_day).format("YYYY-MM-DD")
            : "N/A",
        }))
      );
    });
    // setTransformData(
    //   data?.map((admin) => ({
    //     id: admin.id_admin,
    //     company_name: admin.company.company_name,
    //     fullname: `${admin.first_name} ${admin.last_name}`,
    //     email: admin.email,
    //     profile_picture: admin.profile_picture,
    //     created_date: admin.created_day
    //       ? dayjs(admin.created_day).format("YYYY-MM-DD")
    //       : "N/A",
    //   }))
    // );
  }, [dispatch, sortBy, pageSize, page, startDate, endDate]);

  console.log("data", data);
  console.log("transformData", transformData);
  useEffect(() => {
    setTotal(pagination.total);
  }, [pagination]);

  useEffect(() => {
    if (open) {
      dispatch(fetchCompanies());
    }
  }, [open, dispatch]);

  const handleDelete = async (id) => {
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
        // Replace deleteDataAdmin with the appropriate function to delete the admin
        await deleteDataAdmin(id);
        Swal.fire({
          title: "Deleted",
          text: "Delete Admin Success",
          imageUrl: success,
          imageAlt: "success",
        });
        // Refresh data admin after successful deletion
        dispatch(fetchAllAdmins(sortBy, pageSize, page, startDate, endDate));
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
          rows={transformData}
          pageSize={pageSize}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          searchQuery={searchQuery}
          totalRowCount={total}
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

        <AddAdminForm
          open={newAdministratorModal}
          onClose={handleClose}
          title="Add"
        />

        <DateFilter
          open={openDateFilter}
          onClose={handleCloseDateFilter}
          title="Date Filter"
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <EditAdmin
          open={openModalEdit}
          onClose={handleModalEditClose}
          adminData={selectedData}
          setAdminData={setSelectedData}
          companyData={companies}
        />
      </Box>
    </Grid>
  );
};

export default Administrators;
