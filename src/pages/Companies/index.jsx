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
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomDataGrid from "../../components/CustomDataGrid";
import theme from "../../styles/theme";
import ModalAddNewCompany from "../../components/Modal/ModalAddNewCompany";

const CompaniesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(null); // Single date state

  // Simulate total rows (In real-world, this would come from an API response)
  const totalRowCount = 100;

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

  const rows = [
    {
      id: 1,
      companyName: "ArutalaLab",
      email: "darlene@gmail.com",
      totalAdmin: "2",
      phone: "08123456723",
      createdDay: "June 03, 2024",
    },
    {
      id: 2,
      companyName: "TechVision",
      email: "james@techvision.com",
      totalAdmin: "3",
      phone: "08123456724",
      createdDay: "June 05, 2024",
    },
    {
      id: 3,
      companyName: "InnoSpace",
      email: "susan@innospace.co",
      totalAdmin: "4",
      phone: "08123456725",
      createdDay: "June 07, 2024",
    },
    {
      id: 4,
      companyName: "NextGen Solutions",
      email: "michael@nextgensolutions.net",
      totalAdmin: "5",
      phone: "08123456726",
      createdDay: "June 09, 2024",
    },
    {
      id: 5,
      companyName: "Digital Horizon",
      email: "emma@digitalhorizon.io",
      totalAdmin: "2",
      phone: "08123456727",
      createdDay: "June 11, 2024",
    },
    {
      id: 6,
      companyName: "CloudBase",
      email: "david@cloudbase.com",
      totalAdmin: "3",
      phone: "08123456728",
      createdDay: "June 13, 2024",
    },
    {
      id: 7,
      companyName: "SkyHigh Technologies",
      email: "olivia@skyhightech.com",
      totalAdmin: "4",
      phone: "08123456729",
      createdDay: "June 15, 2024",
    },
    {
      id: 8,
      companyName: "Innovate IT",
      email: "noah@innovateit.org",
      totalAdmin: "2",
      phone: "08123456730",
      createdDay: "June 17, 2024",
    },
    {
      id: 9,
      companyName: "GreenTech",
      email: "ava@greentech.biz",
      totalAdmin: "3",
      phone: "08123456731",
      createdDay: "June 19, 2024",
    },
    {
      id: 10,
      companyName: "BlueOcean Corp",
      email: "liam@blueocean.co",
      totalAdmin: "5",
      phone: "08123456732",
      createdDay: "June 21, 2024",
    },
    {
      id: 11,
      companyName: "BrightFuture",
      email: "sophia@brightfuture.com",
      totalAdmin: "2",
      phone: "08123456733",
      createdDay: "June 23, 2024",
    },
    {
      id: 12,
      companyName: "Alpha Innovations",
      email: "isabella@alphainnovations.co",
      totalAdmin: "3",
      phone: "08123456734",
      createdDay: "June 25, 2024",
    },
    {
      id: 13,
      companyName: "TechWave",
      email: "william@techwave.net",
      totalAdmin: "4",
      phone: "08123456735",
      createdDay: "June 27, 2024",
    },
    {
      id: 14,
      companyName: "NextEra Solutions",
      email: "elizabeth@nexterasolutions.io",
      totalAdmin: "5",
      phone: "08123456736",
      createdDay: "June 29, 2024",
    },
    {
      id: 15,
      companyName: "FutureSight",
      email: "alex@futuresight.com",
      totalAdmin: "2",
      phone: "08123456737",
      createdDay: "July 01, 2024",
    },
    {
      id: 16,
      companyName: "QuantumLeap",
      email: "daniel@quantumleap.biz",
      totalAdmin: "3",
      phone: "08123456738",
      createdDay: "July 03, 2024",
    },
    {
      id: 17,
      companyName: "EchoBase",
      email: "charlotte@echobase.io",
      totalAdmin: "4",
      phone: "08123456739",
      createdDay: "July 05, 2024",
    },
    {
      id: 18,
      companyName: "Visionary Tech",
      email: "matthew@visionarytech.co",
      totalAdmin: "5",
      phone: "08123456740",
      createdDay: "July 07, 2024",
    },
    {
      id: 19,
      companyName: "TechPulse",
      email: "amelia@techpulse.com",
      totalAdmin: "2",
      phone: "08123456741",
      createdDay: "July 09, 2024",
    },
    {
      id: 20,
      companyName: "Innovative Minds",
      email: "harper@innovativeminds.org",
      totalAdmin: "3",
      phone: "08123456742",
      createdDay: "July 11, 2024",
    },
  ];

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
              Add New Administrator
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
            count={Math.ceil(totalRowCount / pageSize)}
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
