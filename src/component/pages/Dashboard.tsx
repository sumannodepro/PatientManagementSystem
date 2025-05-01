import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Modal, IconButton, TextField, Button,Popper,MenuItem,GlobalStyles,FormControl,InputLabel,Select } from '@mui/material';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { API, graphqlOperation } from 'aws-amplify';
import { listPatients } from '../../graphql/queries';
import { listAppointments } from '../../graphql/queries';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { listDoctors } from "../../graphql/queries";
import { toast, ToastContainer } from 'react-toastify';
import { createAppointment } from "../../graphql/mutations";
const localizer = momentLocalizer(moment);

export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [anchorElq, setAnchorElq] = useState(null);  // Anchor for the Popper
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
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
    setCurrentDate(new Date()); // Update currentDate on mount
  }, []);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.graphql({
          query: listAppointments,
          authMode: 'AMAZON_COGNITO_USER_POOLS', // ✅ Add this for authentication
        });
        setAppointments(response.data.listAppointments.items);
        console.log('Appointments:', response.data.listAppointments.items);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
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
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setOpenEventModal(true);
  };
  
  const handleSlotSelect = (slotInfo) => {
    setSelectedDate(dayjs(slotInfo.start));  // Use dayjs for consistency
    setOpenAppointmentModal(true);
  };

  const handleClose = () => {
    setOpenAppointmentModal(false);
    setOpenEventModal(false);
    setSelectedDate(null);
    setSelectedPatient(null);
    setComplaint('');
    setSearchQuery('');  // Reset the search query
  };

  const handleSearchChange = async (event, newNextToken = null) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await API.graphql({
        query: listPatients,
            variables: {
                filter: {
                    or: [
                        { patientName: { beginsWith: query.trim() } },
                        { patientID: { beginsWith: query.trim() } },
                        { mobileNumber: { beginsWith: query.trim() } },
                    ],
                },
                limit: 6000,
                nextToken: newNextToken,
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS', // ✅ Add this to ensure authentication
        });
  
      const results = response.data.listPatients.items;
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  const handleSearchFocus = (event) => {
    setAnchorElq(event.target);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery(patient.patientName); // Optionally show the selected patient's name in the search box
    setSearchResults([]);  // Clear search results after selection
    setAnchorElq(null); 
  };
  

  // Simulating a list of patients (this could come from your database)

  const events = appointments.map(appointment => {
    const startUTC = new Date(appointment.appointmentDateAndTime);
    const startLocal = new Date(startUTC.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })); // Example: Indian time
  
    return {
      title: `${appointment.patientName || 'Unknown Patient'} - ${appointment.complaint || 'No Complaint'}`, // Display patient name and complaint
      doctorName: appointment.doctorName || 'No Doctor',
      complaint: appointment.complaint || 'No Complaint',
      patientID: appointment.patientID || 'No ID',
      patientName: appointment.patientName || 'No Name',
      phoneNumber: appointment.phoneNumber || 'No Phone',
      start: startLocal, 
      end: new Date(startLocal.getTime() + 30 * 60 * 1000), // Add 30 mins
    };
  });
  

  return (
    <Box sx={{ padding: 1 }}>
     <GlobalStyles
  styles={{
    '.rbc-toolbar': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', // Space between left, center, and right
      position: 'relative', // Allows absolute positioning for centering
    },
    '.rbc-toolbar-label': {
      fontWeight: 'bold !important',
      fontSize: '24px !important',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)', // Perfect center alignment
      textAlign: 'center',
    },
    '.rbc-toolbar .rbc-btn-group:first-of-type': {
      display: 'none', // Hide "Today" button
    },
    '.rbc-toolbar button': {
      backgroundColor: '#343a40 !important', // Base color
      color: '#ffffff !important',
      borderRadius: '5px',
      border: 'none',
      padding: '5px 10px',
      margin: '0 5px', // Add some spacing
    },
    '.rbc-toolbar button:hover': {
      backgroundColor: '#6c757d !important', // Lighter shade for hover
    },
    '.rbc-toolbar button:active': {
      backgroundColor: '#7f8c8d !important', // Darker shade for active
    },
    '.rbc-toolbar .rbc-active': {
      backgroundColor: '#7f8c8d !important', // Active (current view button)
      color: '#ffffff !important',
    },
  }}
/>

<Grid container spacing={1}>
  <Grid item xs={12} md={12}>
    <Paper sx={{ padding: 2, backgroundColor: '#f8f9fa', height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '95vh' }}
        views={{ month: true, week: true, day: true }}
        defaultView={Views.WEEK}
        step={30}
        timeslots={1}
        selectable
        onSelectEvent={handleEventSelect}
        min={new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          7,
          0
        )}
        max={new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          18,
          0
        )}
        onSelectSlot={(slotInfo) => {
          if (slotInfo.start < new Date()) {
            return;
          }
          handleSlotSelect(slotInfo);
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#343a40',
            color: '#ffffff',
            borderRadius: '5px',
            border: 'none',
            padding: '5px',
          },
        })}
        components={{
          event: ({ event }) => (
            <div style={{ padding: '1px' }}>
              <strong>{event.patientName}</strong> - {event.complaint}
            </div>
          ),
          toolbar: (toolbarProps) => (
            <div className="rbc-toolbar">
              {/* Left: Back & Next Buttons */}
              <div>
                <IconButton onClick={() => toolbarProps.onNavigate('PREV')}>
                  <ArrowBack sx={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={() => toolbarProps.onNavigate('NEXT')}>
                  <ArrowForward sx={{ color: 'white' }} />
                </IconButton>
              </div>

              {/* Center: Date Label */}
              <span className="rbc-toolbar-label">{toolbarProps.label}</span>

              {/* Right: View Buttons */}
              <div className="rbc-btn-group">
                {['month', 'week', 'day'].map((view) => (
                  <button
                    key={view}
                    type="button"
                    className={`rbc-button ${toolbarProps.view === view ? 'rbc-active' : ''}`}
                    onClick={() => toolbarProps.onView(view)}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ),
        }}
        formats={{
          eventTimeRangeFormat: () => "", // ✅ Removes the time before event title
        }}
      />
    </Paper>
  </Grid>
</Grid>
      {/* Appointment Modal */}
      <Modal open={openAppointmentModal} onClose={handleClose}>
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
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6">Appointment</Typography>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    {/* Display Selected Date & Time */}
    <TextField
      fullWidth
      label="Selected Date and Time"
      variant="outlined"
      size="medium"
      value={selectedDate ? selectedDate.format('YYYY-MM-DD HH:mm') : ''}
      InputProps={{
        readOnly: true,
      }}
      sx={{ marginBottom: 2 }}
    />
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
    {/* Patient Search */}
    <TextField
      fullWidth
      label="Search for Patient"
      variant="outlined"
      size="medium"
      value={searchQuery}
      onChange={handleSearchChange}  // Trigger GraphQL search
      onFocus={handleSearchFocus}
      sx={{ marginBottom: 2 }}
    />

    {/* Popper for displaying search results */}
    <Popper
      open={Boolean(anchorElq) && searchResults.length > 0}  // Show only when results exist
      anchorEl={anchorElq}  // Anchor to the TextField
      placement="bottom-start"  // Position below TextField
      sx={{
        marginTop: '8px',
        zIndex: 2000,
      }}
    >
      <Paper
        sx={{
          maxHeight: 200,
          overflowY: 'auto',
          width: anchorElq ? `${anchorElq.offsetWidth}px` : 'auto',
          boxShadow: 3,
          backgroundColor: '#fff',
          borderRadius: 1,
          
        }}
      >
        {searchResults.map((patient) => (
          <MenuItem key={patient.patientID} onClick={() => handleSelectPatient(patient)}>
            {patient.patientName + " (" + patient.patientID + ")"}
          </MenuItem>
        ))}
      </Paper>
    </Popper>

    {/* Complaint Input */}
    <TextField
      fullWidth
      label="Enter Complaint"
      variant="outlined"
      size="medium"
      value={complaint}
      onChange={(e) => setComplaint(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
    {/* Confirm Button */}
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={handleOk}
      sx={{
        marginTop: 2,
        backgroundColor: '#343a40',
        '&:hover': { backgroundColor: '#495057' },
      }}
    >
      OK
    </Button>
  </Box>
</Modal>


      {/* Event Modal */}
      <Modal open={openEventModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Appointment Details</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Display Event Title */}
          {selectedEvent && (
             <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 1 }}>
              <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Patient ID:</Typography>
  <Typography sx={{ textAlign: "left" }}>{selectedEvent.patientID}</Typography>

  <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Patient Name:</Typography>
  <Typography sx={{ textAlign: "left" }}>{selectedEvent.patientName}</Typography>

  <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Complaint:</Typography>
  <Typography sx={{ textAlign: "left" }}>{selectedEvent.complaint}</Typography>

  <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Phone Number:</Typography>
  <Typography sx={{ textAlign: "left" }}>{selectedEvent.phoneNumber}</Typography>

  <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Doctor Name:</Typography>
  <Typography sx={{ textAlign: "left" }}>{selectedEvent.doctorName}</Typography>

  <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>Start:</Typography>
  <Typography sx={{ textAlign: "left" }}>{selectedEvent.start.toLocaleString()}</Typography>

  <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>End:</Typography>
  <Typography sx={{ textAlign: "left" }}>{selectedEvent.end.toLocaleString()}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
