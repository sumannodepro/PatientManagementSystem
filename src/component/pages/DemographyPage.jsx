import React, { useState,useEffect } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody,TextField, TableCell,Select, MenuItem, FormControl, InputLabel, TableContainer, TableHead, TableRow,Modal, IconButton, } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { API, graphqlOperation } from "aws-amplify";
import { createAppointment } from "../../graphql/mutations"; 
import { listDoctors } from "../../graphql/queries";
import { listAppointments } from "../../graphql/queries";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { updateAppointment } from '../../graphql/mutations';
import dayjs from 'dayjs';
import { deleteAppointment } from "../../graphql/mutations";
import { Avatar, Button, } from '@mui/material';
import { Phone as PhoneIcon, Email as EmailIcon, Home as HomeIcon, Cake as CakeIcon, 
  AccessibilityNew as AccessibilityNewIcon, Bloodtype as BloodtypeIcon, Wc as WcIcon } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
export default function DemographyPage({ selectedPatient }) {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [leftValue, setLeftValue] = useState('');
  const [complaint, setComplaint] = useState("");
  const [newHistory, setNewHistory] = useState({ date: '', condition: '', treatment: '', status: '' });
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  
  const handleView = (appointment) => {
    setSelectedAppointment(appointment); // Store selected appointment
  setOpenViewModal(true); // Open modal
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedAppointment(null);
  };
  const handleCloseEditModal = () => { 
    setOpenEditModal(false);
    setEditedAppointment(null); 
  };
  const handleChange = (event) => { 
    const { name, value } = event.target;
    setEditedAppointment((prevAppointment) => ({ ...prevAppointment, [name]: value }));
  };
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setEditedAppointment({
      ...appointment, 
      doctorID: appointment.doctorID || "", // Ensure doctor is set properly
    });
    setSelectedDate(dayjs(appointment.appointmentDateAndTime));
    setOpenEditModal(true);
  };
  const handleDelete = async (appointmentID) => {
    if (!appointmentID) {
      console.error("Missing appointment ID!");
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const response = await API.graphql({
          query: deleteAppointment,
          variables: { input: { id: appointmentID } },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
  
        toast.success("Appointment deleted successfully");
  
        // Refresh the appointments list after deletion
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appt) => appt.id !== appointmentID)
        );
      } catch (error) {
        toast.error("Error deleting appointment");
        console.error("Error deleting appointment:", error);
      }
    }
  };
  const handleAddHistory = () => {
    // Add the new history to the state array
    setMedicalHistory([...medicalHistory, { ...newHistory, date: new Date().toLocaleDateString() }]);
    setNewHistory({ date: '', condition: '', treatment: '', status: '' });
  };
  const handleEditOk = async () => {
    if (!editedAppointment?.id || !editedAppointment?.doctorID || !selectedDate || !editedAppointment?.complaint) {
      toast.error("Please fill all required fields!");
      return;
    }
  
    const updatedAppointmentData = {
      id: editedAppointment.id, // Required for updating
      doctorID: editedAppointment.doctorID,
      doctorName: doctors.find((doc) => doc.doctorID === editedAppointment.doctorID)?.doctorName || "",
      appointmentDateAndTime: selectedDate.toISOString(), // Convert date to string format
      complaint: editedAppointment.complaint,
    };
  
    try {
      const response = await API.graphql({
        query: updateAppointment,
        variables: { input: updatedAppointmentData },
        authMode: "AMAZON_COGNITO_USER_POOLS", // Ensures authentication
      });
  
      console.log("Appointment updated successfully:", response);
      toast.success("Appointment updated successfully!");
      handleCloseEditModal(); // Close modal after updating
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment. Please try again!");
    }
  };
  const handleOk = async () => {
    if (!selectedDoctor || !selectedPatient || !selectedDate) {
      console.error("Missing required fields!");
      return;
    }
    const appointmentData = {
      patientID: selectedPatient.patientID,
      patientName: selectedPatient.patientName,
      phoneNumber: selectedPatient.mobileNumber,
      appointmentDateAndTime: selectedDate.toISOString(), // Convert to AWSDateTime format
      complaint: complaint,
      doctorID: selectedDoctor.doctorID || null,
      doctorName: selectedDoctor.doctorName || "",
    };
  
    try {
      const response = await API.graphql({
        query: createAppointment,
        variables: { input: appointmentData },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      toast.success("Appointment created successfully"); // Display error message
      setComplaint(""); // Clear the complaint field
      setSelectedDoctor(null); // Clear the selected doctor 
      setSelectedDate(null); // Clear the selected date
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      toast.error("Error creating appointment"); // Display error message
      console.error("Error creating appointment:", error);
    }
  };
  useEffect(() => {
    if (selectedPatient?.patientID) {
      fetchAppointments(selectedPatient.patientID);
    }
  }, [selectedPatient]);

  const fetchAppointments = async (patientID) => {
    try {
      const response = await API.graphql({
        query: listAppointments,
        variables: {
          filter: { patientID: { eq: patientID } },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
  
      const appointmentData = response.data.listAppointments.items;
      setAppointments(appointmentData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
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
  const handleLeftChange = (event) => {
    setLeftValue(event.target.value)
    
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <Box sx={{ padding: 1 }}>
      {selectedPatient ? (
        <Grid container spacing={1}>
          {/* Left Column: Patient Details */}
          <Grid item xs={12} sm={6} lg={3}>
  <Paper
    sx={{
      padding: 2,
      backgroundColor: '#f8f9fa',
     
    }}>
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto',
            backgroundColor: '#343a40',
            color: '#ffffff',
            fontSize: '2rem',
          }}
        >
          {selectedPatient.patientName ? selectedPatient.patientName[0] : 'P'}
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            marginTop: 2,
            fontWeight: 'bold',
            color: '#343a40',
          }}
        >
          {selectedPatient.patientName || 'N/A'}
        </Typography>
      </Grid>

      {/* Patient Details */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
         
          {/* Mobile Number */}
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Mobile: {selectedPatient.mobileNumber || 'N/A'}
            </Typography>
          </Grid>

          {/* Email Address */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Email Address: {selectedPatient.emailId || 'N/A'}
            </Typography>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Address: {selectedPatient.address || 'N/A'}
            </Typography>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              DOB: {selectedPatient.id || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Age: {selectedPatient.age || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Blood Group: {selectedPatient.bloodGroup || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Gender: {selectedPatient.gender || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Appointment Button */}
      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#343a40',
            '&:hover': { backgroundColor: '#495057' },
          }} onClick={handleOpen}> 
          Appointment
        </Button>
      </Grid>
    </Grid>
  </Paper>
</Grid>
          {/* Right Column: Patient History */}
          <Grid item xs={12} sm={6} lg={9}>
          <Paper sx={{ padding: 0, backgroundColor: "#f8f9fa" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#343a40", marginLeft: 2 }}>
        Appointment Details
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, color: "#343a40", backgroundColor: "#f8f9fa" }} aria-label="patient history table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">Age</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Appointment Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Complaint</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center"  }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{selectedPatient.patientName}</TableCell>
                  <TableCell align="center">{selectedPatient.age}</TableCell>
                  <TableCell>{selectedPatient.mobileNumber}</TableCell>
                  <TableCell>
  {appointment?.appointmentDateAndTime
    ? new Date(appointment.appointmentDateAndTime).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "N/A"}</TableCell>
    <TableCell>{appointment.complaint}</TableCell>
                  <TableCell align="center">
  {/* Edit Button */}
  <IconButton size="small" onClick={() => handleEdit(appointment)} color="secondary">
    <EditIcon sx={{ color: "#343a40" }} />
  </IconButton>
    {/* View Button */}
  <IconButton size="small" onClick={() => handleView(appointment)} color="primary">
    <VisibilityIcon sx={{ color: "#343a40" }} />
  </IconButton>

  {/* Delete Button */}
  <IconButton size="small" onClick={() => handleDelete(appointment.id)} color="error">
    <DeleteIcon sx={{ color: "#dc3545" }} />
  </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No appointments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
          {/* Medical History Section */}
  <Grid item xs={12} sm={6} lg={12} sx={{ marginTop: 2 }}>
  
    <Paper sx={{ padding: 0, backgroundColor: '#f8f9fa' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',marginBottom: 1 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#343a40',marginLeft: 2  }}>
    Medical History
  </Typography>
  
  <IconButton
  sx={{
    backgroundColor: '#343a40',
    color: 'white',
    marginRight: 2,
    fontSize: 20,
    '&:hover': {
      backgroundColor: '#343a40', // Keep the same background color on hover
      color: 'white', // Keep the icon color the same on hover
    }
  }}
  onClick={handleAddHistory}
>
  <AddIcon sx={{
    fontSize: 18,
  }}/>
</IconButton>
</Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, color: '#343a40', backgroundColor: '#f8f9fa' }} aria-label="medical history table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Treatment</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through medical history entries */}
            {medicalHistory.map((history, index) => (
              <TableRow key={index}>
                <TableCell>{history.date}</TableCell>
                <TableCell>{history.condition}</TableCell>
                <TableCell>{history.treatment}</TableCell>
                <TableCell>{history.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Grid>
        </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          Please select a patient to view details.
        </Typography>
      )}
      <Modal open={open} onClose={handleOk}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2">
              Appointment
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="select-doctor-label">Select Doctor</InputLabel>
          <Select
  value={selectedDoctor ? selectedDoctor.doctorID : ""}
  onChange={(e) => {
    const doctor = doctors.find((doc) => doc.doctorID === e.target.value);
    setSelectedDoctor(doctor || null);
  }}
  labelId="select-doctor-label"
  label="Select Doctor"
  name="selectDoctor"
>
  <MenuItem value="None">None</MenuItem>
  {doctors.map((doctor) => (
    <MenuItem key={doctor.doctorID} value={doctor.doctorID}>
      {doctor.doctorName}
    </MenuItem>
  ))}
</Select>
          </FormControl>
          <TextField
            fullWidth
            label="Enter Complaint"
            variant="outlined"
            size="medium"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select Date and Time"
              value={selectedDate}
              sx={{ width: '100%' }}
              onChange={handleDateChange}
              minDate={dayjs()}
              renderInput={(params) => <TextField {...params}   sx={{ marginBottom: 2 }} />}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOk}
            sx={{
              marginTop: 2,
              backgroundColor: '#343a40',
              '&:hover': { backgroundColor: '#495057' },
            }}>
            OK
          </Button>
        </Box>
      </Modal>
       {/* View Appointment Modal */}
       <Modal open={openViewModal} onClose={handleCloseViewModal}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "white",
      boxShadow: 24,
      p: 2,
      borderRadius: 2,
    }}
  >
    {/* Header with Close Icon */}
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Appointment Details
      </Typography>
      <IconButton onClick={handleCloseViewModal} sx={{ color: "#343a40" }}>
        <CloseIcon />
      </IconButton>
    </Box>
    {/* Appointment Details */}
    {selectedAppointment && (
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 1 }}>
         <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Patient Name:</Typography>
         <Typography sx={{ textAlign: "left" }}>{selectedAppointment.patientName || "N/A"}</Typography>

         <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Age:</Typography>
        <Typography sx={{ textAlign: "left" }}>{selectedPatient.age || "N/A"}</Typography>

        <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Doctor:</Typography>
        <Typography sx={{ textAlign: "left" }}>{selectedAppointment.doctorName || "N/A"}</Typography>

        <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Date & Time:</Typography>
        <Typography sx={{ textAlign: "left" }}>
          {new Date(selectedAppointment.appointmentDateAndTime).toLocaleString()}
        </Typography>

        <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Complaint:</Typography>
        <Typography sx={{ textAlign: "left" }}>{selectedAppointment.complaint || "N/A"}</Typography>
      </Box>
    )}
  </Box>
</Modal>
<Modal open={openEditModal} onClose={handleCloseEditModal}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "white",
      boxShadow: 24,
      p: 2,
      borderRadius: 2,
    }}>
    {/* Header with Close Icon */}
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Edit Appointment
      </Typography>
      <IconButton onClick={handleCloseEditModal} sx={{ color: "#343a40" }}>
        <CloseIcon />
      </IconButton>
    </Box>
    <TextField
          label="Patient Name"
          name="patientName"
          value={editedAppointment?.patientName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <FormControl fullWidth sx={{ marginBottom: 1,marginTop: 1 }}>
          <InputLabel id="select-doctor-label">Select Doctor</InputLabel>
          <Select
  value={editedAppointment?.doctorID || ""}
  onChange={(e) => setEditedAppointment(prev => ({ ...prev, doctorID: e.target.value }))}
  labelId="select-doctor-label"
  label="Select Doctor"
  name="selectDoctor"
>
  <MenuItem value="">None</MenuItem>
  {doctors.map((doctor) => (
    <MenuItem key={doctor.doctorID} value={doctor.doctorID}>
      {doctor.doctorName}
    </MenuItem>
  ))}
</Select>
          </FormControl>
          <TextField
  fullWidth
  label="Enter Complaint"
  variant="outlined"
  size="medium"
  value={editedAppointment?.complaint || ""}
  onChange={(e) =>
    setEditedAppointment(prev => ({ ...prev, complaint: e.target.value }))
  }
  sx={{ marginBottom: 2 }}
/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select Date and Time"
              value={selectedDate}
              sx={{ width: '100%' }}
              onChange={handleDateChange}
              minDate={dayjs()}
              renderInput={(params) => <TextField {...params}   sx={{ marginBottom: 2 }} />}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEditOk}
            sx={{
              marginTop: 2,
              backgroundColor: '#343a40',
              '&:hover': { backgroundColor: '#495057' },
            }}>
            OK
          </Button>
    </Box>
  </Modal>
  <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
