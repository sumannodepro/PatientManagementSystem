import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Table, TableBody, TableCell,MenuItem,FormControl,InputLabel,Select, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete,Add } from '@mui/icons-material';
import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";
import { listDoctors } from "../../graphql/queries";
import { createPatientTreatment } from "../../graphql/mutations";
const InvoicePage = ({ selectedPatient, selectedTreatments }) => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    patientName: '',
    phone: '',
    email: '',
    patientAddress: '',
    clinicName: '',
    clinicAddress: '',
    treatments: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    grandTotal: 0,
    amountPaid: 0,
    modeOfPayment: ''
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [leftValue, setLeftValue] = useState('');
  const handleLeftChange = (event) => {
    setLeftValue(event.target.value)
    
  };
useEffect(() => {
  const fetchAuthUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setAuthUser(user);
    } catch (error) {
      console.error("Error fetching authenticated user:", error);
    }
  };
  fetchAuthUser();
}, []);
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await API.graphql({
        query: listDoctors,
        authMode: "AMAZON_COGNITO_USER_POOLS", // ✅ Added auth mode
      });
      if (response.data?.listDoctors?.items) {
        setDoctors(response.data.listDoctors.items);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  fetchDoctors();
}, []);
  // Auto-fill patient and treatment details when props change
  useEffect(() => {
    if (selectedPatient) {
      setInvoice(prev => ({
        ...prev,
        patientName: selectedPatient?.patientName || '',
        phone: selectedPatient?.mobileNumber || '',
        email: selectedPatient?.emailId || '',
        patientAddress: selectedPatient?.address || ''
      }));
    }
    
    if (selectedTreatments?.length) {
      const treatments = selectedTreatments.map((treatment, index) => ({
        id: index + 1,
        treatmentName: treatment.treatmentName,
        price: treatment.price || 0,
        quantity: 1,
        discount: 0,
        amount: treatment.price || 0
      }));
      setInvoice(prev => ({ ...prev, treatments }));
      calculateTotals(treatments);
    }
  }, [selectedPatient, selectedTreatments]);

  // Handle input changes for invoice fields
  const handleInputChange = (e, _, field) => {
    setInvoice({ ...invoice, [field]: e.target.value });
  };
  const formatDateForAWS = (dateString) => {
    if (!dateString) return null; // Return null if the date is undefined
  const parts = dateString.split("/");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert DD/MM/YYYY to YYYY-MM-DD
  }
  return null;
  };
  // Handle changes in treatment fields
  const handleTreatmentChange = (e, index, field) => {
    const value = e.target.value;
    const treatments = [...invoice.treatments];
    treatments[index][field] = field === 'treatmentName' ? value : parseFloat(value) || 0;
    treatments[index].amount = treatments[index].price - treatments[index].discount;
    setInvoice({ ...invoice, treatments });
    calculateTotals(treatments);
  };
  // Save invoice to the database
  const saveInvoice = async () => {
    try {
      if (!selectedPatient || !selectedPatient.patientID) {
        console.error("No patient selected.");
        return;
      }
  
      if (!authUser) {
        console.error("User is not authenticated.");
        return;
      }
  
      for (const treatment of invoice.treatments) {
        const treatmentData = {
          patientID: selectedPatient.patientID,
          invoiceNumber: invoice.invoiceNumber,
          treatmentID: String(treatment.id),
          treatmentName: treatment.treatmentName,
          price: parseFloat(treatment.price),
          discount: treatment.discount ? parseFloat(treatment.discount) : 0,
          totalAmount: parseFloat(treatment.price) - (treatment.discount || 0),
          date: treatment.date ? treatment.date.split("T")[0] : new Date().toISOString().split("T")[0],
          doctorID: selectedDoctor?.id || null,
          owner: authUser.username,
          modeOfPayment: invoice.modeOfPayment,
        };
  
        console.log("Saving treatment:", JSON.stringify(treatmentData, null, 2));
  
        const response = await API.graphql({
          query: createPatientTreatment,
          variables: { input: treatmentData },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
  
        console.log("Response:", response);
      }
  
      alert("Invoice saved successfully!");
    } catch (error) {
      console.error("Error saving invoice:", JSON.stringify(error, null, 2));
    }
  };
  
  
  
  // Remove a treatment row   
  const removeTreatment = (index) => {
    const treatments = [...invoice.treatments];
    treatments.splice(index, 1);
    setInvoice({ ...invoice, treatments });
    calculateTotals(treatments);
  };
  // Calculate subtotal, tax, and grand total
  const calculateTotals = (treatments) => {
    let subtotal = treatments.reduce((acc, item) => acc + item.amount, 0);
    let discount = (subtotal * invoice.discount) / 100;
    let tax = (subtotal * invoice.tax) / 100;
    let grandTotal = subtotal - discount + tax;

    setInvoice(prev => ({
      ...prev,
      subtotal,
      discount,
      tax,
      grandTotal
    }));
  };

  // Add a new treatment row
  const addTreatment = () => {
    setInvoice(prev => ({
      ...prev,
      treatments: [...prev.treatments, { id: prev.treatments.length + 1, treatmentName: '', price: 0, quantity: 1, discount: 0, amount: 0 }]
    }));
  };

  return (
    <div style={{ padding: '10px' }}>
      <Typography variant="h4" gutterBottom>Invoice</Typography>

      {/* Invoice Number and Date */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Invoice Number" variant="outlined" value={invoice.invoiceNumber} onChange={(e) => handleInputChange(e, null, 'invoiceNumber')} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Date" type="date" variant="outlined" InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>

      {/* Patient Information */}
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Patient Name" variant="outlined" value={invoice.patientName} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone" variant="outlined" value={invoice.phone} disabled />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" type="email" variant="outlined" value={invoice.email} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Patient Address" variant="outlined" value={invoice.patientAddress} disabled />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: '20px',marginTop: '10px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
          <InputLabel id="select-doctor-label">Select Doctor</InputLabel>
      <Select
        value={leftValue}
        onChange={handleLeftChange}
        labelId="select-doctor-label"
        label="Select Doctor"
        name="selectDoctor"
      >
        <MenuItem value="None">None</MenuItem>
        {doctors.map((doctor) => (
          <MenuItem key={doctor.doctorID} value={doctor.doctorName}>
            {doctor.doctorName}
          </MenuItem>
        ))}
      </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Mode of Payment"
            variant="outlined"
            value={invoice.modeOfPayment}
            onChange={(e) => handleInputChange(e, null, 'modeOfPayment')}
          />
        </Grid>
      </Grid>
      {/* Treatment Table */}
      <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between', marginTop: '20px' }}>
  <Typography variant="h5">Treatment Details</Typography>
  <IconButton color="primary" onClick={addTreatment} style={{  backgroundColor: '#343a40',marginLeft: '10px' }}>
    <Add style={{ color: 'white' }}/>
  </IconButton>
  </div>
      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>S.No</strong></TableCell>
              <TableCell><strong>Treatment Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Discount</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.treatments.map((treatment, index) => (
              <TableRow key={treatment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField fullWidth variant="outlined" value={treatment.treatmentName} onChange={(e) => handleTreatmentChange(e, index, 'treatmentName')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth variant="outlined" type="number" value={treatment.price} onChange={(e) => handleTreatmentChange(e, index, 'price')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth variant="outlined" type="number" value={treatment.discount} onChange={(e) => handleTreatmentChange(e, index, 'discount')} />
                </TableCell>
                <TableCell>{treatment.amount.toFixed(2)}</TableCell>
                <TableCell>
                <IconButton color="error" onClick={() => removeTreatment(index)}>
                <Delete />
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     

      {/* Summary Fields */}
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={6}><TextField fullWidth label="Subtotal" variant="outlined" value={invoice.subtotal} disabled /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Discount (%)" variant="outlined" value={invoice.discount} onChange={(e) => handleInputChange(e, null, 'discount')} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Tax (%)" variant="outlined" value={invoice.tax} onChange={(e) => handleInputChange(e, null, 'tax')} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Grand Total" variant="outlined" value={invoice.grandTotal} disabled /></Grid>
      </Grid>
      <Button variant="contained" color="primary" style={{ backgroundColor: '#343a40',marginTop: '10px' }} onClick={() => saveInvoice()}>Save</Button>
    </div>
  );
};

export default InvoicePage;
