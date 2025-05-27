// MultiDateInvoice.jsx
import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Table, TableBody, TableCell, MenuItem,
  FormControl, InputLabel, Select, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";
import { listDoctors } from "../../graphql/queries";
import { createPatientTreatment } from "../../graphql/mutations";

const MultiDateInvoice = ({ selectedPatient, selectedTreatments }) => {
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
          authMode: "AMAZON_COGNITO_USER_POOLS",
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
        amount: treatment.price || 0,
        date: ''
      }));
      setInvoice(prev => ({ ...prev, treatments }));
      calculateTotals(treatments);
    }
  }, [selectedPatient, selectedTreatments]);

  const handleTreatmentChange = (e, index, field) => {
    const value = field === 'treatmentName' || field === 'date' ? e.target.value : parseFloat(e.target.value) || 0;
    const treatments = [...invoice.treatments];
    treatments[index][field] = value;
    treatments[index].amount = treatments[index].price - treatments[index].discount;
    setInvoice({ ...invoice, treatments });
    calculateTotals(treatments);
  };

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

  const addTreatment = () => {
    setInvoice(prev => ({
      ...prev,
      treatments: [...prev.treatments, {
        id: prev.treatments.length + 1,
        treatmentName: '',
        price: 0,
        discount: 0,
        amount: 0,
        date: ''
      }]
    }));
  };

  const removeTreatment = (index) => {
    const treatments = [...invoice.treatments];
    treatments.splice(index, 1);
    setInvoice({ ...invoice, treatments });
    calculateTotals(treatments);
  };

  const saveInvoice = async () => {
    try {
      if (!selectedPatient || !selectedPatient.patientID) return;

      if (!authUser) {
        console.error("User not authenticated");
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
          totalAmount: treatment.amount,
          date: treatment.date,
          doctorID: selectedDoctor?.id || null,
          owner: authUser.username,
          modeOfPayment: invoice.modeOfPayment,
        };

        const response = await API.graphql({
          query: createPatientTreatment,
          variables: { input: treatmentData },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        console.log("Saved:", response);
      }

      alert("Invoice with multiple dates saved!");
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <Typography variant="h4" gutterBottom>Invoice (Multiple Dates)</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Invoice Number" variant="outlined" value={invoice.invoiceNumber} onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Mode of Payment" variant="outlined" value={invoice.modeOfPayment} onChange={(e) => setInvoice({ ...invoice, modeOfPayment: e.target.value })} />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Patient Name" variant="outlined" value={invoice.patientName} disabled /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" variant="outlined" value={invoice.phone} disabled /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Email" variant="outlined" value={invoice.email} disabled /></Grid>
        <Grid item xs={12} sm={6}><TextField fullWidth label="Patient Address" variant="outlined" value={invoice.patientAddress} disabled /></Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="doctor-label">Select Doctor</InputLabel>
            <Select
              value={leftValue}
              onChange={(e) => {
                const selected = doctors.find(doc => doc.doctorName === e.target.value);
                setLeftValue(e.target.value);
                setSelectedDoctor(selected);
              }}
              labelId="doctor-label"
              label="Select Doctor"
            >
              <MenuItem value="None">None</MenuItem>
              {doctors.map((doctor) => (
                <MenuItem key={doctor.doctorID} value={doctor.doctorName}>{doctor.doctorName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
        <Typography variant="h5">Treatment Details</Typography>
        <IconButton color="primary" onClick={addTreatment} style={{ backgroundColor: '#343a40' }}>
          <Add style={{ color: 'white' }} />
        </IconButton>
      </div>

      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>No</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Treatment</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Discount</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.treatments.map((treatment, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField type="date" fullWidth variant="outlined" value={treatment.date} onChange={(e) => handleTreatmentChange(e, index, 'date')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth value={treatment.treatmentName} onChange={(e) => handleTreatmentChange(e, index, 'treatmentName')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth type="number" value={treatment.price} onChange={(e) => handleTreatmentChange(e, index, 'price')} />
                </TableCell>
                <TableCell>
                  <TextField fullWidth type="number" value={treatment.discount} onChange={(e) => handleTreatmentChange(e, index, 'discount')} />
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

      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={6}><TextField fullWidth label="Subtotal" variant="outlined" value={invoice.subtotal} disabled /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Discount (%)" variant="outlined" value={invoice.discount} onChange={(e) => setInvoice({ ...invoice, discount: parseFloat(e.target.value) || 0 })} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Tax (%)" variant="outlined" value={invoice.tax} onChange={(e) => setInvoice({ ...invoice, tax: parseFloat(e.target.value) || 0 })} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Grand Total" variant="outlined" value={invoice.grandTotal} disabled /></Grid>
      </Grid>

      <Button variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: '#343a40' }} onClick={saveInvoice}>
        Save
      </Button>
    </div>
  );
};

export default MultiDateInvoice;
