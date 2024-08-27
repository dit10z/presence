import { Add, Delete, Edit, Search, Visibility } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomDataGrid from "../../components/CustomDataGrid";
import theme from "../../styles/theme";
import ModalAddNewCompany from "../../components/Modal/ModalAddNewCompany";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompany,
  fetchDataCompanies,
} from "../../redux/slices/companySlice";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ModalEditCompany from "../../components/Modal/ModalEditCompany";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DateFilterModal from "../../components/Modal/ModalDateFilter";
import ModalEditCompanyCopy from "../../components/Modal/ModalEditCompanyCopy";
import EditCompanyForm from "../../components/Forms/Company/EditCompanyForm";
import Swal from "sweetalert2";
import success from "../../assets/icons/success.png";
import AddCompanyForm from "../../components/Forms/Company/AddCompanyForm";

const CompaniesList = () => {
  const dispatch = useDispatch();
  const { data, status, pagination } = useSelector((state) => state.companies);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [open, setOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const [editCompanyModal, setEditCompanyModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  console.log("start date : ", startDate);
  console.log("end date : ", endDate);

  const handleEditOpen = (id) => {
    setSelectedCompanyId(id);
    setEditCompanyModal(true);
  };
  const handleEditClose = () => setEditCompanyModal(false);

  const totalCount = data && data?.length;
  console.log(totalCount);

  const navigate = useNavigate();

  const handleViewClick = (id_company) => {
    navigate(`/company-detail/${id_company}`);
  };

  const handleOpenDateFilter = () => {
    setStartDate({});
    setEndDate({});
    setOpenDateFilter(true);
  };

  const handleCloseDateFilter = () => setOpenDateFilter(false);

  const handleDeleteCompany = async (id_company) => {
    console.log("id company : ", id_company);
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
        const data = { is_delete: true };
        await dispatch(deleteCompany({ id: id_company, data })); // Gunakan dispatch untuk memanggil deleteCompany

        Swal.fire({
          title: "Deleted",
          text: "Delete Company Success",
          imageUrl: success,
          imageAlt: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // Refresh data setelah berhasil menghapus
            window.location.reload();
          }
        });
      } catch (error) {
        if (error) {
          Swal.fire(
            "Error",
            "There was an error deleting the company.",
            "error"
          );
        }
        console.error("Error deleting company:", error);
      }
    }
  };

  const columns = [
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "totalAdmin", headerName: "Total Admin", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "createdDay", headerName: "Joining Date", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          <IconButton
            aria-label="view"
            onClick={() => handleViewClick(params.row.id)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handleEditOpen(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteCompany(params.row.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const params = {
      sortBy: sortBy,
      pageSize: pageSize,
      pageNumber: page,
      start_date_joined: startDate || undefined,
      end_date_joined: endDate || undefined,
    };
    dispatch(fetchDataCompanies(params));
  }, [dispatch, sortBy, pageSize, page, startDate, endDate]);

  useEffect(() => {
    setTotalPage(pagination.total);
  }, [pagination]);

  const transformedData =
    data?.map((company) => ({
      id: company.id_company,
      companyName: company.company_name,
      email: company.email,
      totalAdmin: company.total_admin,
      phone: company.phone,
      createdDay: company.created_date
        ? dayjs(company.created_date).format("YYYY-MM-DD")
        : "N/A", // Handle null or undefined dates
    })) || [];

  const [newCompanyModal, setNewCompanyModal] = useState(false);

  const handleOpen = () => setNewCompanyModal(true);
  const handleClose = () => setNewCompanyModal(false);

  if (status) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={"10px"}
      padding={2.5}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* Filter and Search */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            <CustomButton
              startIcon={<DateRangeIcon />}
              color="white"
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
              Add New Company
            </CustomButton>
          </Stack>
        </Box>

        {/* Custom Data Grid */}
        <CustomDataGrid
          columns={columns}
          rows={transformedData} // Using the data from Redux
          pageSize={pageSize}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          searchQuery={searchQuery}
          totalRowCount={totalCount}
          hidePagination={true}
        />
        {/* Entries adn Pagination Controls */}
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
            count={Math.ceil(totalPage / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Box>
      <AddCompanyForm
        open={newCompanyModal}
        onClose={handleClose}
        title="Add"
      />
      <EditCompanyForm
        open={editCompanyModal}
        onClose={handleEditClose}
        companyId={selectedCompanyId}
      />

      <DateFilterModal
        open={openDateFilter}
        onClose={handleCloseDateFilter}
        title="Date Filter"
        startDate={startDate}
        endDate={endDate}
        setStartDate={(date) => setStartDate(new Date(date))}
        setEndDate={(date) => setEndDate(new Date(date))}
      />
    </Grid>
  );
};

export default CompaniesList;
