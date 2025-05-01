import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { listPatientChiefCompliants } from '../../graphql/queries';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination, FormControlLabel, Checkbox, Paper, Typography, Button, IconButton, Tooltip, TextField, Modal,Box, TableFooter } from '@mui/material';
import { CSVLink } from 'react-csv';
import { Edit, Delete, Visibility, FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

const StatisticsPage = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchAllPatients();
  }, []);
  const [filter2025, setFilter2025] = useState(false); // State for 2025 filter
  const handlePrintPDF = () => {
    const doc = new jsPDF();
  
    // Table columns
    const columns = ["Patient ID", "Name", "Mobile", "Chief Complaint", "Findings", "Diagnosis","doctorname", "Date"];
  
    // Table rows (transform data into an array of arrays)
    const rows = filteredPatients.map(patient => ([
      patient.profileId || "N/A",
      patient.patientName || "N/A",
      patient.mobileNumber || "N/A",
      patient.chiefComplaint || "N/A",
      patient.findings || "N/A",
      patient.diagnosis || "N/A",
      patient.doctorname || "N/A",
      patient.date ? new Date(patient.date).toLocaleDateString('en-GB') : '-'
    ]));
  
    doc.text("Patient Records", 14, 10);
  
    // ✅ Call autoTable using the imported function
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 2 },
      theme: 'striped',
      margin: { top: 20 }
    });
  
    doc.save("Patient_Records.pdf");
  };
  
const handle2025FilterChange = () => {
  setFilter2025(!filter2025);
};
  const fetchAllPatients = async () => {
    let allPatients = [];
    let nextToken = null;

    try {
      do {
        const response = await API.graphql({
          query: listPatientChiefCompliants,
          variables: { nextToken, limit: 50 },
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });

        const fetchedPatients = response.data.listPatientChiefCompliants.items;
        allPatients = [...allPatients, ...fetchedPatients];
        nextToken = response.data.listPatientChiefCompliants.nextToken;
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

  const filteredPatients = patients
  .filter(patient => {
    const matchesSearch =
      patient.doctorname?.toLowerCase().includes(searchQuery.toLowerCase()) ;

    const matches2025 = filter2025 ? patient.date?.startsWith("2025") : true; 

    return matchesSearch && matches2025;
  })
  .sort((a, b) => new Date(a.profileId) - new Date(b.profileId)); // ✅ Sorting by date in ascending order


  const csvHeaders = [
    { label: "Patient ID", key: "profileId" },
    { label: "Name", key: "patientName" },
    { label: "Mobile", key: "mobileNumber" },
    { label: "Chief Complaint", key: "chiefComplaint" },
    { label: "Findings", key: "findings" },
    { label: "Diagnosis", key: "diagnosis" },
    {label: "Payment", key: "payment"},
    { label: "Date", key: "date" }
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
  {/* Checkbox for Filtering 2025 Records */}
  <FormControlLabel
    control={
      <Checkbox
        checked={filter2025}
        onChange={handle2025FilterChange}
        color="primary"
      />
    }
    label="Only 2025 Records"
  />

  <Button variant="contained" sx={{ background: '#343a40', whiteSpace: 'nowrap' }}>
    <CSVLink 
      data={filteredPatients} 
      headers={csvHeaders} 
      filename="filteredPatients.csv" 
      style={{ color: 'white', textDecoration: 'none' }}
    >
      Export CSV
    </CSVLink>
  </Button>
  <Button 
    variant="contained" 
    sx={{ background: '#343a40', color: 'white', whiteSpace: 'nowrap', marginLeft: 2 }} 
    onClick={handlePrintPDF}
  >
    Print
  </Button>
</Box>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              {['Patient ID', 'Name', 'Mobile', 'Chief Complaint', 'Findings', 'Diagnosis', 'Payment','Doctor','Date'].map((head) => (
                <TableCell key={head} sx={{ fontWeight: 'bold', textAlign: 'center' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient, index) => (
              <TableRow key={patient.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <TableCell align="center">{patient.profileId || "N/A"}</TableCell>
                <TableCell align="center">{patient.patientName || "N/A"}</TableCell>
                <TableCell align="center">{patient.mobileNumber || "N/A"}</TableCell>
                <TableCell align="center">{patient.chiefComplaint || "N/A"}</TableCell>
                <TableCell align="center">{patient.findings || "N/A"}</TableCell>
                <TableCell align="center">{patient.diagnosis || "N/A"}</TableCell>
                <TableCell align="center">{patient.payment || "N/A"}</TableCell>
                <TableCell align="center">{patient.doctorname || "N/A"}</TableCell>
                <TableCell align="center">{patient.date ? new Date(patient.date).toLocaleDateString('en-GB') : '-'}</TableCell>
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
    </Paper>
  );
};

export default StatisticsPage;
