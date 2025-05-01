import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Modal,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableSortLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider
} from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleButton from '@mui/material/ToggleButton';
import SaveIcon from "@mui/icons-material/Save";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { API, graphqlOperation } from "aws-amplify";
import { listPatientChiefCompliants } from "../../graphql/queries";
import { CSVLink } from 'react-csv';
import { deletePatientChiefCompliant } from "../../graphql/mutations";
import { updatePatientChiefCompliant } from "../../graphql/mutations"; 
import { createPatientChiefCompliant } from "../../graphql/mutations"; 
import { listDoctors } from "../../graphql/queries"; // Import the GraphQL query
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast, ToastContainer } from 'react-toastify';
import { Edit, Visibility, Close } from "@mui/icons-material";
import dayjs from "dayjs";

export default function ComplaintPage({
  chiefComplaints,
  setChiefComplaints,
  findings,
  setFindings,
  diagnosis,
  setDiagnosis,
  selectedPatient,
  chiefRecords,
}) {
  const [mode, setMode] = useState('text');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentEntry, setCurrentEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [leftValue, setLeftValue] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [chiefComplaintsData, setChiefComplaintsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editData, setEditData] = useState(null); // Store selected record for editing
  const [openEditModal, setOpenEditModal] = useState(false); // Modal visibility control
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [treatment, setTreatment] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setPayment(value);
  };
const handleTreatmentChange = (event) => {
    const value = event.target.value;
    setTreatment(value);
  };
  const handleLeftChange = (event) => {
    setLeftValue(event.target.value)
    
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
  const handleSave = async () => {
    try {
      if (
        !chiefComplaints || chiefComplaints.length === 0 ||
        !findings || findings.length === 0 ||
        !diagnosis || diagnosis.length === 0 ||
        !selectedDate || !leftValue
      ) {
        toast.error("Please enter all details!"); // Display error message
        return; // Exit function
      } else {
        setLoading(true);
        const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : null;
        console.log(formattedDate)
        const response = await API.graphql({
          query: createPatientChiefCompliant, // Ensure this mutation exists in your GraphQL schema
          variables: { 
            input: { 
              chiefComplaint: chiefComplaints, 
              findings: findings, 
              diagnosis: diagnosis, 
              profileId: selectedPatient.patientID,
              date: formattedDate,
              patientName: selectedPatient.patientName,
              doctorname: leftValue,
              payment: payment,
              treatment: treatment,
            }
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
  
        if (response.data.createPatientChiefCompliant) {
          // Update UI
          setChiefComplaintsData((prevData) => [
            ...prevData,
            response.data.createPatientChiefCompliant
          ]);
          toast.success("Record saved successfully!");
          setChiefComplaints([]);
          setFindings([]);
          setDiagnosis([]);
          setPayment("");
          setSelectedDate(null);
          setLeftValue("");
          setTreatment("");
        }
      }
      // Close modal after saving
      setOpenEditModal(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving record:", error);
      toast.error("Failed to save record.");
    }
    finally {
      setLoading(false); // Stop loading
    }
  };
  
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await API.graphql({
        query: updatePatientChiefCompliant,
        variables: { input: { 
          id: editData.id, 
          chiefComplaint: editData.chiefComplaint,
          findings: editData.findings,
          diagnosis: editData.diagnosis,
          doctor: editData.doctor,
          payment: editData.payment,
        }},
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
  
      if (response.data.updatePatientChiefCompliant) {
        // Update UI by modifying state
        setChiefComplaintsData((prevData) =>
          prevData.map(item => 
            item.id === editData.id ? { ...item, ...editData } : item
          )
        );
        toast.success('Record updated successfully!', {
          position: "top-right",
          autoClose: 2000,
          toastId: `update-${editData.id}`,
        });
       
        setOpenModal(false); // Close modal after update
      } else {
       toast.error('Failed to update record!', {
          position: "top-right",
          autoClose: 2000,
          toastId: `update-error-${editData.id}`,
        });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      toast.error('Failed to update record!', {
        position: "top-right",
        autoClose: 2000,
        toastId: `update-error-${editData.id}`,
      });
    }
    finally {
      setLoading(false); // Stop loading
    }
    setOpenEditModal(false)
  };

const handleEdit = (item) => {
  setEditData(item); // Set selected record for editing
  setOpenEditModal(true); // Open the modal
};
  const handleDeleteRecord = async (id) => {
    if (!id) return;
      
      const confirmDelete = window.confirm("Are you sure you want to delete this record?");
      if (!confirmDelete) return;
    setLoading(true);
    try {
      await API.graphql({
        query: deletePatientChiefCompliant,
        variables: { input: { id } },
        authMode: "AMAZON_COGNITO_USER_POOLS", // Ensures user authentication
      });
      setChiefComplaintsData((prevData) => prevData.filter(item => item.id !== id));
      toast.error('Record deleted successfully!', { 
        position: "top-right",
        autoClose: 2000, // Closes after 2 seconds
        toastId: `delete-${id}`, // Ensures no duplicate toast messages
      });
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error('Failed to delete record!', { 
        position: "top-right",
        autoClose: 2000,
        toastId: `delete-error-${id}`,
      });
    }
    finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    const fetchChiefComplaints = async () => {
      if (!selectedPatient || !selectedPatient.patientID) return;
  
      let allData = [];
      let nextToken = null;
      setLoading(true);
      try {
        do {
          const response = await API.graphql({
            query: listPatientChiefCompliants,
            variables: {
              filter: { profileId: { eq: selectedPatient.patientID } },
              limit: 1000, // Fetch maximum allowed items per request
              nextToken,   // Pass nextToken to get the next page
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
  
          const { items, nextToken: newNextToken } = response.data.listPatientChiefCompliants;
          allData = [...allData, ...items]; // Append new data
          nextToken = newNextToken; // Update nextToken for next iteration
  
        } while (nextToken); // Keep fetching until nextToken is null
  
        setChiefComplaintsData(allData); // Set the final merged data
  
      } catch (error) {
        console.error("Error fetching chief complaints:", error);
        setChiefComplaintsData([]);
      }
      finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchChiefComplaints();
  }, [selectedPatient]);
  
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  
    const sortedData = [...chiefComplaintsData].sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return isAsc ? dateA - dateB : dateB - dateA;
    });
  
    setChiefComplaintsData(sortedData); // Assuming you're using state
  };
  
 const handleOpenModal = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedComplaint(null);
  };
    const sortedRecords = [...(chiefRecords || [])].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    const filteredRecords = sortedRecords.filter(record =>
      record.chiefComplaintsData.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const csvData = [
    ["Patient ID", "Patient Name", "Mobile Number", "Chief Complaints","Findings","Dianosis", "Date"],
    ...chiefComplaintsData.map(record => [
      selectedPatient.patientID,
      selectedPatient.patientName,
      selectedPatient.mobileNumber,
      record.chiefComplaintsData,
      record.findings,
      record.diagnosis,
      record.date,
    ])
  ];

  const handleToggle = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };
const handleRemoveFile = (fileName) => {
  setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
};
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleOpen = (title, initialEntries) => {
    setModalTitle(title);
    setEntries([...initialEntries]); // Pre-fill modal with existing entries
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEntry('');
  };

  const handleAddEntry = () => {
    if (currentEntry.trim() !== '') {
      setEntries((prev) => [...prev, currentEntry.trim()]);
      setCurrentEntry('');
    }
  };

  const handleRemoveEntry = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDone = () => {
    if (modalTitle === 'Chief Complaint') setChiefComplaints([...entries]);
    if (modalTitle === 'Findings') setFindings([...entries]);
    if (modalTitle === 'Diagnosis') setDiagnosis([...entries]);
    setOpen(false);
    setCurrentEntry('');
  };

  const renderSegment = (title, data, onAdd) => (
    <Grid item xs={12} md={3}>
      <Paper
        sx={{
          padding: 2,
          backgroundColor: '#f8f9fa',
         
        }}
      >
        <Typography variant="h6" sx={{ color: '#343a40' }}>
          {title}
        </Typography>
        <List>
          {data.length > 0 ? (
            data.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              {`${title} content goes here...`}
            </Typography>
          )}
        </List>
        <Button
          variant="contained"
          onClick={onAdd}
          sx={{
            backgroundColor: '#343a40',
            color: '#f8f9fa',
            '&:hover': {
              backgroundColor: '#23272b',
            },
          }}
        >
          Add
        </Button>
      </Paper>
    </Grid>
  );
  return (
    <Box sx={{ padding: 1 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {selectedPatient ? (
        <>
          <Grid container spacing={1}>
            {/* Left Segment - Displays either Text Mode or Upload Mode */}
            <Grid item xs={12} md={4} >
            <Box display="flex" justifyContent="space-between" mb={1}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleToggle}
              aria-label="mode selection"
              size="small" // Reduce the size of the ToggleButtonGroup
              sx={{
                marginTop: '-8px',
                '& .MuiToggleButton-root': {
                  fontSize: '0.75rem', // Smaller font size
                  padding: '4px 8px', // Reduce padding
                  minWidth: '70px', // Reduce button width
                  backgroundColor: '#343a40', // Background color
                  color: '#f8f9fa', // Text color
                  transition: 'background-color 0.3s ease', // Smooth transition effect

                  '&:hover': {
                  backgroundColor: '#495057', // Slightly lighter color on hover
                  },  
                  '&.Mui-selected': {
                    backgroundColor: '#7f8c8d', // Darker color when selected
                    color: '#f8f9fa', // Ensure text remains visible
                    '&:hover': {
                      backgroundColor: '#5f6a6a', // Darker hover effect for selected state
                    },
                  },
                },
              }}>
              <ToggleButton value="text" aria-label="Text Mode">
                Text Mode
              </ToggleButton>
              <ToggleButton value="upload" aria-label="Upload Mode">
                Image Mode
              </ToggleButton>
            </ToggleButtonGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={selectedDate}
    onChange={(newDate) => setSelectedDate(newDate)}
    format="DD/MM/YYYY"
    slotProps={{
      textField: {
        size: "small",
        sx: {
          width: "155px", // Adjust width as needed
          "& .MuiInputBase-root": {
            height: "40px", // Adjust height as needed
            fontSize: "15px", // Adjust font size
          },
        },
      },
    }} />
            </LocalizationProvider>
            <IconButton onClick={handleSave}>
      <SaveIcon  sx={{ color: '#343a40' }}/>
    </IconButton>
          </Box>
              {mode === 'text' ? (
                <Grid container spacing={1} direction="column">
                  {renderSegment('Chief Complaint', chiefComplaints, () =>
                    handleOpen('Chief Complaint', chiefComplaints)
                  )}
                  {renderSegment('Findings', findings, () =>
                    handleOpen('Findings', findings)
                  )}
                  {renderSegment('Diagnosis', diagnosis, () =>
                    handleOpen('Diagnosis', diagnosis)
                  )}
                  <Grid item xs={12} md={3}>
                  <Paper
        sx={{
          padding: 2,
          backgroundColor: '#f8f9fa',
         
        }}
      >
        
        <FormControl sx={{ width: { xs: "100%", sm: 200 }, minWidth: 120 }}>
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
  <TextField
        label="Payment details"
        name="payment"
        fullWidth
        value={payment}
        onChange={handleChange}
        sx={{ width: { xs: '100%', sm: 200, },ml: 1}}/>
        <TextField
        label="Treatment details"
        name="treatment"
        fullWidth
        value={treatment}
        onChange={handleTreatmentChange}
        sx={{ width: { xs: '100%', sm: 200, },mt: 1}}/>
      </Paper>
                    </Grid>
                </Grid>
              ) : (
                <Paper
                  sx={{
                    padding: 2,
                    backgroundColor: '#f8f9fa',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ backgroundColor: '#343a40', color: '#f8f9fa' }}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Box mt={2}>
                    {uploadedFiles.length > 0 && (
                      <Grid container spacing={2}>
                        {uploadedFiles.map((file, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box sx={{ position: 'relative' }}>
                              {file.type.startsWith('image/') ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                  }}
                                />
                              ) : (
                                <Typography variant="body2" color="textSecondary">
                                  {file.name} (PDF)
                                </Typography>
                              )}
                              <IconButton
                                size="small"
                                onClick={() => handleRemoveFile(file.name)}
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  backgroundColor: 'white',
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                </Paper>
              )}
            </Grid>
  
            {/* Right Segment - Placeholder for Future Data */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  padding: 0,
                  backgroundColor: '#f8f9fa',
                }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                  <TextField
                    label="Search Chief Complaint"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CSVLink data={csvData} filename={`ChiefRecords_${selectedPatient.patientID}.csv`}>
                    <Button variant="contained" size="small" sx={{
                  backgroundColor: '#343a40',
                }}>Export CSV</Button>
                  </CSVLink>
                </Box>
                <TableContainer component={Paper} sx={{ maxHeight: 'calc(95vh - 200px)', overflow: 'auto' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                      <TableCell sx={{ width: '15%' }}>
  <TableSortLabel
    active={orderBy === 'date'}
    direction={order}
    onClick={() => handleSort('date')}
  >
    <strong>Date</strong>
  </TableSortLabel>
</TableCell>
                        <TableCell  sx={{ width: '25%' }} ><strong>Chief Complaint</strong></TableCell>
                        <TableCell  sx={{ width: '25%' }} ><strong>Findings</strong></TableCell>
                        <TableCell  sx={{ width: '25%' }} ><strong>Diagnosis</strong></TableCell>
                        <TableCell  sx={{ width: '25%' }} ><strong>Payment</strong></TableCell>
                        <TableCell  align="center" sx={{ width: '10%' }}><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chiefComplaintsData.length > 0 ? (
                        chiefComplaintsData.map((complaint) => (
                          <TableRow key={complaint.id}>
                            <TableCell> {complaint.date ? new Date(complaint.date).toLocaleDateString('en-GB') : '-'}</TableCell>
                            <TableCell>{complaint.chiefComplaint}</TableCell>
                            <TableCell>{complaint.findings}</TableCell>
                            <TableCell>{complaint.diagnosis}</TableCell>
                            <TableCell>{complaint.payment}</TableCell>
                            <TableCell>
                            <Box display="flex" alignItems="center" gap={0.5}>
                            <IconButton sx={{ color: '#343a40',}} size="small" onClick={() => handleOpenModal(complaint)}>
                            <Visibility />
                            </IconButton>
                            <IconButton sx={{color: '#343a40',}} size="small" onClick={() => handleEdit(complaint)}>
                            <Edit />
                            </IconButton>
                            <IconButton color='error' size="small" onClick={() => handleDeleteRecord(complaint.id)}>
                            <DeleteIcon />
                            </IconButton>
                          </Box>
                            </TableCell>
                          </TableRow>
                        ))
                        ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No treatment records available.
                          </TableCell>
                        </TableRow>
                        )}
                      </TableBody>
                   </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
          <ToastContainer position="top-right" autoClose={2000} />
        </>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
          Please select a patient to view details.
        </Typography>
      )}

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 700,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 2,
    }}
  >
    {/* Modal Header */}
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {modalTitle}
      </Typography>
      <IconButton size="small" onClick={handleClose} aria-label="Close">
        <CloseIcon />
      </IconButton>
    </Box>

    {/* Entries List */}
    <List
      sx={{
        maxHeight: 150,
        overflowY: 'auto',
        marginBottom: 2,
        border: '1px solid #ddd',
        borderRadius: 1,
        padding: 1,
      }}
    >
      {entries.length > 0 ? (
        entries.map((entry, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveEntry(index)} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemText primary={`• ${entry}`} />
          </ListItem>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ padding: 1 }}>
          No entries added yet.
        </Typography>
      )}
    </List>

    {/* Input Field */}
    <TextField
      label={`Enter ${modalTitle}`}
      fullWidth
      value={currentEntry}
      onChange={(e) => setCurrentEntry(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleAddEntry();
      }}
      autoFocus
      sx={{ marginBottom: 2 }}
    />

    {/* Action Buttons */}
    <Box display="flex" justifyContent="space-between">
      <Button
        variant="contained"
        onClick={handleAddEntry}
        disabled={!currentEntry.trim()} // Prevents empty entries
        sx={{
          textTransform: 'none',
          backgroundColor: '#343a40',
          color: '#f8f9fa',
          '&:hover': {
            backgroundColor: '#23272b',
          },
        }}
      >
        Add
      </Button>
      <Button
        variant="contained"
        onClick={handleDone}
        sx={{
          backgroundColor: '#343a40',
          color: '#f8f9fa',
          '&:hover': {
            backgroundColor: '#23272b',
          },
        }}
      >
        Done
      </Button>
    </Box>
  </Box>
</Modal>

      {/* Modal */}
<Modal open={openModal} onClose={handleCloseModal}>
      <Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 6,
    p: 3,
    borderRadius: 3,
  }}>
  {/* Header */}
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
    <Typography variant="h6" fontWeight="bold" sx={{
                  color: '#343a40',
                }}>
      Chief Complaint Details
    </Typography>
    <IconButton onClick={handleCloseModal} aria-label="Close">
      <Close sx={{ fontSize: 24 }} />
    </IconButton>
  </Box>

  <Divider sx={{ mb: 1 }} />

  {/* Complaint Details in Grid Format */}
  {selectedComplaint ? (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Patient Name:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.patientName || "N/A"}
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Date:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.date}
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Chief Complaint:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.chiefComplaint}
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Findings:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.findings}
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Diagnosis:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.diagnosis}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Treatment Done-By:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.doctorname}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Treatment:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.treatment}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ textAlign: "left" }}>
          Payment:
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left" }}>
          {selectedComplaint.payment}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Typography color="textSecondary">No complaint details available.</Typography>
  )}
  </Box>
</Modal>
  <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <Box sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 6,
    p: 3,
    borderRadius: 3,
  }}>
    <Typography variant="h6">Edit Chief Complaint</Typography>

    <TextField
      label="Chief Complaint"
      value={editData?.chiefComplaint || ""}
      onChange={(e) => setEditData({ ...editData, chiefComplaint: e.target.value })}
      fullWidth
      sx={{ mt: 2 }}
    />

    <TextField
      label="Findings"
      value={editData?.findings || ""}
      onChange={(e) => setEditData({ ...editData, findings: e.target.value })}
      fullWidth
      sx={{ mt: 2 }}
    />

    <TextField
      label="Diagnosis"
      value={editData?.diagnosis || ""}
      onChange={(e) => setEditData({ ...editData, diagnosis: e.target.value })}
      fullWidth
      sx={{ mt: 2 }}
    />
    <TextField
      label="Doctor"
      value={editData?.doctorname || ""}
      onChange={(e) => setEditData({ ...editData, doctor: e.target.value })}
      fullWidth
      sx={{ mt: 2 }}
    />
    <TextField
      label="Payment"
      value={editData?.payment || ""}
      onChange={(e) => setEditData({ ...editData, payment: e.target.value })}
      fullWidth
      sx={{ mt: 2 }}
    />

    <TextField
      label="Date"
      type="date"
      value={editData?.date || ""}
      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
      fullWidth
      sx={{ mt: 2 }}
      InputLabelProps={{ shrink: true }}
    />

    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
      <Button variant="contained" onClick={() => setOpenEditModal(false)} sx={{ mr: 2,  backgroundColor: "#343a40",
    "&:hover": {
      backgroundColor: "#23272b", // Darker shade for hover effect
    }, }}>Cancel</Button>
      <Button
  onClick={handleUpdate}
  variant="contained"
  sx={{
    backgroundColor: "#343a40",
    "&:hover": {
      backgroundColor: "#23272b", // Darker shade for hover effect
    },
  }}
>
  Update
</Button>
    </Box>
      </Box>
</Modal>

    </Box>
     
  );  
}
