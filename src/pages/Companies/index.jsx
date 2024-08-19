// import { Add, Delete, Edit, Search, Visibility } from '@mui/icons-material';
// import {
//   Avatar,
//   Box,
//   Grid,
//   IconButton,
//   InputAdornment,
//   MenuItem,
//   Pagination,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';
// import React from 'react';
// import theme from '../../styles/theme';

// import { DatePicker } from '@mui/x-date-pickers';
// import CustomButton from '../../components/CustomButton';

// const CompaniesList = () => {
//   return (
//     <Grid border={`1px solid ${theme.palette.grey[300]}`} borderRadius={'10px'} padding={2.5}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           {/* Filter and Search */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <TextField
//               placeholder="Search"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>
//           <Stack direction="row" spacing={2}>
//             <DatePicker label="Date Filter" />

//             {/* Add New Administrator */}
//             <CustomButton variant="contained" color="primary" startIcon={<Add />}>
//               Add New Administrator
//             </CustomButton>
//           </Stack>
//         </Box>

//         {/* Administrator Grid */}
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Grid container>
//               <Grid item xs={3}>
//                 <Typography fontWeight="normal" color={`${theme.palette.grey[600]}`}>
//                   Company Name
//                 </Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <Typography fontWeight="normal" color={`${theme.palette.grey[600]}`}>
//                   Administrator Name
//                 </Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <Typography fontWeight="normal" color={`${theme.palette.grey[600]}`}>
//                   Email
//                 </Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Typography fontWeight="normal" color={`${theme.palette.grey[600]}`}>
//                   Joining Date
//                 </Typography>
//               </Grid>
//               <Grid item xs={1}>
//                 <Typography fontWeight="normal" color={`${theme.palette.grey[600]}`}>
//                   Action
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//           {/* Map through the list of administrators */}
//           {[
//             { company: 'ArutalaLab', name: 'Darlene Robertson', email: 'darlene@gmail.com', date: 'June 28, 2024' },
//             { company: 'ArutalaLab', name: 'Floyd Miles', email: 'floyd@gmail.com', date: 'June 03, 2024' },
//             // Add more rows as needed
//           ].map((admin, index) => (
//             <Grid item xs={12} key={index}>
//               <Grid container alignItems="center">
//                 <Grid item xs={3}>
//                   <Typography>{admin.company}</Typography>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Avatar sx={{ mr: 2 }} />
//                     <Typography>{admin.name}</Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Typography>{admin.email}</Typography>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Typography>{admin.date}</Typography>
//                 </Grid>
//                 <Grid item xs={1}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <IconButton aria-label="view">
//                       <Visibility />
//                     </IconButton>
//                     <IconButton aria-label="edit">
//                       <Edit />
//                     </IconButton>
//                     <IconButton aria-label="delete">
//                       <Delete />
//                     </IconButton>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Pagination */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
//           <TextField select defaultValue={10} sx={{ width: 100 }}>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={20}>20</MenuItem>
//             <MenuItem value={30}>30</MenuItem>
//           </TextField>

//           <Pagination count={6} page={1} />
//         </Box>
//       </Box>
//     </Grid>
//   );
// };

// export default CompaniesList;

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
import axios from "axios";

const CompaniesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const totalRowCount = 100;
  const [rows, setRows] = useState([]);

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
      renderCell: () => (
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          <IconButton aria-label="view">
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

  const fetchData = async (pageSize, pageNumber) => {
    try {
      const token = `eyJhbGciOiJIUzI1NiJ9.eyJpZF9zdXBlcmFkbWluIjoyLCJpZF9hY2NvdW50IjoiNjBjYzYzNTAtYzZiZS00OTMxLTlkYjUtZjg4NWJjMjI0ZDgwIiwic3ViIjoibXVyaTEyMzQiLCJpYXQiOjE3MjM3OTUxMjUsImV4cCI6MTcyMzg4MTUyNX0.WQv_c4aMafcsBnIvau_dKqiv8gtPiSQ2dEBTIp21new`;

      const response = await axios.get(
        `http://localhost:8080/company-management/companies?filter&sortBy=company_name,ASC&pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = response.data;
      console.log(data.message);
      setTotalCount(data.data.length);

      // Transform API data to match DataGrid structure
      const transformedData = data.data.map((company) => ({
        id: company.id_company,
        companyName: company.company_name,
        email: company.email,
        totalAdmin: company.total_admin,
        phone: company.phone,
        createdDay: company.created_date || "N/A", // Handle null dates
      }));

      setRows(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(pageSize, page);
  }, [pageSize, page]);

  const [newCompanyModal, setNewCompanyModal] = useState(false);

  const handleOpen = () => setNewCompanyModal(true);
  const handleClose = () => setNewCompanyModal(false);

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
              Add New Company
            </CustomButton>
          </Stack>
        </Box>

        {/* Custom Data Grid */}
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
            count={Math.ceil(totalCount / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Box>
      <ModalAddNewCompany
        open={newCompanyModal}
        onClose={handleClose}
        title="Add"
      ></ModalAddNewCompany>
    </Grid>
  );
};

export default CompaniesList;
