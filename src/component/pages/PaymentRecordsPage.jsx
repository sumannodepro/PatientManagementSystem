  import React, { useState, useEffect } from 'react';
  import { Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material';
  import { CSVLink } from 'react-csv';
  import InvoicePage from './InvoicePage';
  import { API, graphqlOperation } from "aws-amplify";
  import { listPatientTreatments } from "../../graphql/queries"; // Ensure this path is correct
  import { updatePatientTreatment } from "../../graphql/mutations";
  import { deletePatientTreatment } from "../../graphql/mutations";
  import IconButton from '@mui/material/IconButton';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from '@mui/icons-material/Delete';
  import PrintIcon from '@mui/icons-material/Print';
  export default function PaymentRecordsPage({ selectedPatient, selectedTreatments }) {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [editForm, setEditForm] = useState({
      totalAmount: "",
      treatmentName: "",
      date: "",
    });
    const [paymentRecords, setPaymentRecords] = useState([]);

    const fetchPatientTreatments = async () => {
      if (!selectedPatient?.patientID) return;
    
      try {
        const response = await API.graphql({
          query: listPatientTreatments,
          variables: { 
            filter: { patientID: { eq: selectedPatient.patientID } } 
          },
          authMode: "AMAZON_COGNITO_USER_POOLS" // Ensure correct auth mode
        });
    
        const treatments = response?.data?.listPatientTreatments?.items || [];
        setPaymentRecords(treatments);
        console.log("Fetched Treatments:", treatments);
      } catch (error) {
        console.error("Error fetching patient treatments:", error);
      }
    };
    const handleDelete = async (id) => {
      if (!id) return;
      
      const confirmDelete = window.confirm("Are you sure you want to delete this record?");
      if (!confirmDelete) return;
    
      try {
        await API.graphql({
          query: deletePatientTreatment,
          variables: { input: { id } },
          authMode: 'AMAZON_COGNITO_USER_POOLS' // or API_KEY or AWS_IAM depending on your setup
        });
        setPaymentRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
        console.log("Record deleted successfully");
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    };
    const handleView = (record) => {
      setSelectedRecord(record);
      setOpenViewModal(true);
    };
    // Open Edit Modal with Pre-filled Data
  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditForm({
      totalAmount: record.totalAmount,
      treatmentName: record.treatmentName,
      date: record.date,
    });
    setOpenEditModal(true);
  };

  // Close Modals
  const handleCloseModals = () => {
    setOpenViewModal(false);
    setOpenEditModal(false);
    setSelectedRecord(null);
  };

  // Handle Edit Input Change
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save Edited Data
  const handleSaveEdit = async () => {
    try {
      await API.graphql(
        graphqlOperation(updatePatientTreatment, {
          input: {
            id: selectedRecord.id,
            totalAmount: editForm.totalAmount,
            treatmentName: editForm.treatmentName,
            date: editForm.date,
          },
        })
      );

      // Refresh Table Data
      fetchPatientTreatments();
      handleCloseModals();
    } catch (error) {
      console.error("Error updating treatment:", error);
    }
  };
  const handlePrint = (record, patient) => {
    const printWindow = window.open('', '_blank');
  
    if (!printWindow) {
      alert('Popup blocked! Allow popups for printing.');
      return;
    }
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #000; }
            .header, .footer { text-align: center; }
            .header h2 { margin: 0; font-size: 24px; }
            .contact-info { font-size: 14px; text-align: center; margin-bottom: 20px; }
            .invoice-title { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
            .info-section { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .table th, .table td { border: 1px solid black; padding: 8px; text-align: left; }
            .table th { background-color: #f2f2f2; }
            .amount-details { text-align: right; margin-top: 20px; font-size: 16px; }
            .signature { text-align: right; margin-top: 100px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>SUVIDHI DENTISTRY</h2>
            <p class="contact-info">
              99/235, Paper Mills Road, Perambur, Chennai Tamil Nadu - 600011<br>
              Email: Sumanbohra88@gmail.com | Mobile: 9884358810
            </p>
          </div>
          <div class="invoice-title">Invoice Receipt</div>
  
          <div class="info-section">
            <div><strong>Patient ID:</strong> ${record.patientID || '---'}</div>
            <div><strong>Invoice No:</strong> ${record.invoiceNumber || '0367'}</div>
          </div>
          <div class="info-section">
            <div><strong>Name:</strong> ${selectedPatient?.patientName || '---'}</div>
           <div><strong>Date:</strong> ${record.date ? new Date(record.date).toLocaleDateString('en-GB'): '---'}</div>
          </div>
          <div class="info-section">
            <div><strong>Mobile:</strong> ${selectedPatient?.mobileNumber || '0000000000'}</div>
          </div>
  
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Treatment</th>
                <th>Price (Rs)</th>
                <th>Discount</th>
                <th>Amount (Rs)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>${record.treatmentName || '---'}</td>
                <td>${record.price || 0}</td>
                <td>${record.discount || 0}</td>
                <td>${record.totalAmount || 0}</td>
              </tr>
            </tbody>
          </table>
  
         <div style="display: flex; justify-content: space-between; margin-top: 20px;">
  <div style="text-align: left;">
    <p><strong>Treatment By:</strong> Dr. Suman Bohra</p>
    <p>DCI Reg.no 14560</p>
  </div>
  <div class="amount-details">
   
    <p><strong>Grand Total:</strong> Rs ${record.grandTotal || record.totalAmount || '0'}</p>
    <p><strong>Amount Due (Rs):</strong> Rs ${record.amountDue || '0'}</p>
    <p><strong>Mode Of Payment:</strong> ${record.modeOfPayment || '0'}</p>
  </div>
</div>
          <div class="signature">
            Authorised Signature
          </div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
  
    setTimeout(() => printWindow.print(), 500);
  };
  
  
  
    useEffect(() => {
      fetchPatientTreatments();
    }, [selectedPatient]);
    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const sortedRecords = [...(paymentRecords || [])].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    const filteredRecords = sortedRecords.filter(record =>
      record.date && record.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const csvData = [
      ["Patient ID", "Patient Name", "Mobile Number", "Invoice Date", "Amount", "Treatment Name"],
      ...paymentRecords.map(record => [
        selectedPatient?.patientID || "",
        selectedPatient?.patientName || "",
        selectedPatient?.mobileNumber || "",
        record.date || "", // Ensure date is used correctly
        record.totalAmount || "", // Use totalAmount instead of amount
        record.treatmentName || "", // Use treatmentName instead of due
      ])
    ];

    return (
      <Box sx={{ padding: 1 }}>
        {selectedPatient ? (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
              <Paper sx={{ padding: 1, backgroundColor: '#f8f9fa' }}>
              <InvoicePage selectedPatient={selectedPatient} selectedTreatments={selectedTreatments} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 0, backgroundColor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                  <TextField
                    label="Search Invoice"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CSVLink data={csvData} filename={`PaymentRecords_${selectedPatient.patientID}.csv`}>
                  <Button variant="contained" size="small" sx={{
                  backgroundColor: '#343a40',
                }}>Export CSV</Button>
                  </CSVLink>
                </Box>
                <TableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell onClick={() => handleSort('invoiceDate')}><strong>Invoice/Date</strong></TableCell>
                        <TableCell onClick={() => handleSort('amount')}><strong>Amount</strong></TableCell>
                        <TableCell onClick={() => handleSort('due')}><strong>Due</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentRecords.length > 0 ? (
                        paymentRecords.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell> {(() => {
    const date = new Date(record.date);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  })()}</TableCell>
                            <TableCell>Rs {record.totalAmount}</TableCell>
                            <TableCell>{record.treatmentName}</TableCell>
                            <TableCell>
                            <IconButton color="primary" onClick={() => handleView(record)}>
                            <VisibilityIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => handleEdit(record)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDelete(record.id)}>
                            <DeleteIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={() => handlePrint(record)}>
                            <PrintIcon />
                            </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            No payment records available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
            Please select a patient to view payment/records.
          </Typography>
        )}
      </Box>
    );
  }
