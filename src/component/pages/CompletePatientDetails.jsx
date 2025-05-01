import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { listPatients } from '../../graphql/queries';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination, Paper, Typography, Button, IconButton, Tooltip, TextField, Modal,Box, TableFooter } from '@mui/material';
import { CSVLink } from 'react-csv';
import { Edit, Delete, Visibility, FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const CompletePatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    let allPatients = [];
    let nextToken = null;

    try {
      do {
        const response = await API.graphql({
          query: listPatients,
          variables: { nextToken },
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });

        const fetchedPatients = response.data.listPatients.items;
        allPatients = [...allPatients, ...fetchedPatients];
        nextToken = response.data.listPatients.nextToken;
      } while (nextToken);

      const sortedPatients = allPatients.sort((a, b) => parseInt(a.patientID, 10) - parseInt(b.patientID, 10));
      setPatients(sortedPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFirstPageButtonClick = () => {
    setPage(0);
  };

  const handleLastPageButtonClick = () => {
    setPage(Math.max(0, Math.ceil(patients.length / rowsPerPage) - 1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPatient(null);
  };

  const csvHeaders = [
    { label: "Patient ID", key: "patientID" },
    { label: "Name", key: "patientName" },
    { label: "Mobile", key: "mobileNumber" },
    { label: "Email", key: "emailId" },
    { label: "City", key: "city" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" }
  ];

  return (
    <Paper sx={{ padding: 1, margin: 1,backgroundColor: '#f8f9fa'}}>
     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
  <TextField
    label="Search Patients"
    variant="outlined"
    size="small"
    sx={{ flexGrow: 1, maxWidth: '300px' }} // Adjust width as needed
    value={searchQuery}
    onChange={handleSearchChange}
  />
  <Button variant="contained" sx={{ background: '#343a40', whiteSpace: 'nowrap' }}>
    <CSVLink 
      data={patients} 
      headers={csvHeaders} 
      filename="patients.csv" 
      style={{ color: 'white', textDecoration: 'none' }}
    >
      Export CSV
    </CSVLink>
  </Button>
</Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              {['Patient ID', 'Name', 'Mobile', 'Email', 'City', 'Age', 'Gender', 'Actions'].map((head) => (
                <TableCell key={head} sx={{ fontWeight: 'bold', textAlign: 'center' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient, index) => (
              <TableRow key={patient.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <TableCell align="center">{patient.patientID}</TableCell>
                <TableCell align="center">{patient.patientName}</TableCell>
                <TableCell align="center">{patient.mobileNumber}</TableCell>
                <TableCell align="center">{patient.emailId}</TableCell>
                <TableCell align="center">{patient.city}</TableCell>
                <TableCell align="center">{patient.age}</TableCell>
                <TableCell align="center">{patient.gender}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton sx={{color:'#343a40'}} onClick={() => handleView(patient)}>
                      <Visibility />
                    </IconButton>
                    <IconButton sx={{color:'#343a40'}} onClick={() => handleView(patient)}>
                      <Edit />
                    </IconButton>
                    <IconButton sx={{color:'#343a40'}} onClick={() => handleDelete(patient.patientID)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredPatients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={() => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
              <FirstPage />
            </IconButton>
            <IconButton onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredPatients.length / rowsPerPage) - 1}>
              <KeyboardArrowRight />
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(filteredPatients.length / rowsPerPage) - 1}>
              <LastPage />
            </IconButton>
          </div>
        )}        
      />
      <Modal open={openModal} onClose={handleCloseModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 3,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Patient Details
    </Typography>
    {selectedPatient && (
      <div>
        <Typography><strong>ID:</strong> {selectedPatient.patientID}</Typography>
        <Typography><strong>Name:</strong> {selectedPatient.patientName}</Typography>
        <Typography><strong>Mobile:</strong> {selectedPatient.mobileNumber}</Typography>
        <Typography><strong>Email:</strong> {selectedPatient.emailId}</Typography>
        <Typography><strong>City:</strong> {selectedPatient.city}</Typography>
        <Typography><strong>Age:</strong> {selectedPatient.age}</Typography>
        <Typography><strong>Gender:</strong> {selectedPatient.gender}</Typography>
      </div>
    )}
    <Box mt={2} textAlign="right">
      <Button onClick={handleCloseModal} color="primary" variant="contained">
        Close
      </Button>
    </Box>
  </Box>
</Modal>
    </Paper>
  );
};

export default CompletePatientDetails;
