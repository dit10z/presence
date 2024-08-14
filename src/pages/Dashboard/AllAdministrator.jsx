import React from "react";
import { Navigate } from "react-router-dom";
import {
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  TablePagination,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
const data = [
  {
    company: "ArutalaLab",
    name: "Darlene Robertson",
    email: "darlene@gmail.com",
    date: "June 28, 2024",
  },
  {
    company: "ArutalaLab",
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    date: "June 03, 2024",
  },
  {
    company: "Padepokan79",
    name: "Cody Fisher",
    email: "cody@gmail.com",
    date: "March 29, 2024",
  },
  {
    company: "Padepokan79",
    name: "Dianne Russell",
    email: "dianne@gmail.com",
    date: "July 01, 2024",
  },
  {
    company: "PT Astra International",
    name: "Savannah Nguyen",
    email: "savannah@gmail.com",
    date: "August 17, 2023",
  },
  {
    company: "PT Bank Central Asia",
    name: "Jacob Jones",
    email: "jacob@gmail.com",
    date: "February 15, 2024",
  },
  {
    company: "PT Bank Central Asia",
    name: "Marvin McKinney",
    email: "marvinmck@gmail.com",
    date: "April 03, 2024",
  },
  {
    company: "PT Gudang Garam",
    name: "Brooklyn Simmons",
    email: "brooklyn@gmail.com",
    date: "May 25, 2024",
  },
  {
    company: "PT Gudang Garam",
    name: "Kristin Watson",
    email: "kristinwatson@gmail.com",
    date: "June 28, 2024",
  },
  {
    company: "PT Telkom Indonesia",
    name: "Kathryn Murphy",
    email: "kathrynm@gmail.com",
    date: "June 22, 2024",
  },
];

const AdminTabel = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Administrator</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Joining Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.company}>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <IconButton>Visibility</IconButton>
                  <IconButton>Edit</IconButton>
                  <IconButton>Delete</IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </Box>
  );
};
const AdminButton = () => {
  return (
    <Box>
      <Stack direction="row">
        <TextField
          select
          label="Company"
          variant="outlined"
          style={{ marginRight: "20px", width: "200px" }}
        >
          <MenuItem value="data.company">Company</MenuItem>
          <MenuItem value="data.name">Employee Name</MenuItem>
        </TextField>

        <Box display="flex" alignItems="center" style={{ marginRight: "20px" }}>
          <IconButton>
            <Search />
          </IconButton>
          <TextField label="Search" variant="outlined" />
        </Box>

        <Button
          variant="outlined"
          color="primary"
          // startIcon={<DateRange />}
          style={{ marginRight: "20px" }}
        >
          Date Filter
        </Button>

        <Button
          variant="contained"
          color="primary"
          // startIcon={<Add />}
        >
          Add New Administrator
        </Button>
      </Stack>
    </Box>
  );
};
const AllAdministrator = () => {
  return (
    <div>
      <Typography>All Administrator</Typography>
      <AdminButton />
      <AdminTabel />
    </div>
  );
};

export default AllAdministrator;
