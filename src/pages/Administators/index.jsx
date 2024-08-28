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
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import theme from "../../styles/theme";
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
  Tabs,
  Tab,
} from "@mui/material";
import AddAdminForm from "../../forms/Administrator/AddAdminForm";

const Administrators = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admins, status, pagination } = useSelector((state) => state.admin);

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
  const [activeTab, setActiveTab] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dataCompanyMaster, setDataCompanyMaster] = useState([]);

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
    console.log(e.target.value);
    setSearchQuery(e.target.value);
    console.log(e.target.value);
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

  useEffect(() => {
    dispatch(
      fetchAllAdmins(searchQuery, sortBy, pageSize, page, startDate, endDate)
    );
    console.log("data", admins);
  }, [dispatch, searchQuery, sortBy, pageSize, page, startDate, endDate]);

  useEffect(() => {
    setTotal(pagination.total);
  }, [pagination]);

  const transformedData =
    admins?.map((admin) => ({
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

  const ModalEditAdmin = ({ open, onClose, adminId }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dataCompanyMaster, setDataCompanyMaster] = useState([]);
    const FormField = styled(TextField)({
      width: "100%",
    });
    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };

    const handleToggleNewPasswordVisibility = () => {
      setShowNewPassword(!showNewPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
    return (
      <CustomModal
        open={open}
        onClose={onClose}
        title="Edit Adminstrator"
        onSubmit={formik.handleSubmit}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Admin Information"
            icon={<AccountCircleIcon />}
            iconPosition="start"
          />
          <Tab
            label="Change Password"
            icon={<EditIcon />}
            iconPosition="start"
          />
        </Tabs>
        {activeTab === 0 && (
          <Grid container spacing={3} mt={3}>
            <Grid item xs={6}>
              <FormField
                label="First Name"
                variant="outlined"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Last Name"
                variant="outlined"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Username"
                variant="outlined"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Email"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                select
                label="Company"
                variant="outlined"
                name="idcompany"
                value={formik.values.idcompany}
                onChange={formik.handleChange}
                error={
                  formik.touched.idcompany && Boolean(formik.errors.idcompany)
                }
                helperText={formik.touched.idcompany && formik.errors.idcompany}
              >
                {dataCompanyMaster.map((data, index) => (
                  <MenuItem value={data.id_company} key={index}>
                    {data.company_name}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
          </Grid>
        )}
        {activeTab === 1 && (
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12}>
              <FormField
                label="Enter New Password"
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle new password visibility"
                        onClick={handleToggleNewPasswordVisibility}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                label="Re-type New Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        )}
        <Box mt={6} display="flex" justifyContent="flex-end">
          <CustomButton
            onClick={onClose}
            variant="outlined"
            sx={{ marginRight: 1 }}
            color="button"
          >
            Cancel
          </CustomButton>
          <CustomButton variant="contained" color="primary" type="submit">
            Save
          </CustomButton>
        </Box>
      </CustomModal>
    );
  };

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

        <AddAdminForm
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
