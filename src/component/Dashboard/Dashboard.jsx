import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Auth } from "aws-amplify";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { LocalHospital as LocalHospitalIcon } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneIcon from '@mui/icons-material/Done';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PaymentIcon from '@mui/icons-material/Payment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Home from '../pages/HomePage';
import Modal from '@mui/material/Modal';
import DemographyPage from '../pages/DemographyPage';
import ChiefComplaintPage from '../pages/ChiefComplaintPage';
import CalanderSyn from '../pages/CalanderSyn';
import CasePhotos from '../pages/CasePhotos';
import Claude from '../pages/ClaudeChat';
import TreatmentSuggestedPage from '../pages/TreatmentSuggestedPage';
import SpeakToText from '../pages/speakToText';
import CompletePatientDetails from '../pages/CompletePatientDetails';
import PrescriptionApp from '../pages/PrescriptionApp';
import TreatmentDonePage from '../pages/TreatmentDonePage';
import StatisticsPage from '../pages/StatisticsPage';
import IOSViewerPage from '../pages/IOSViewerPage';
import PrePostPage from '../pages/PrePostPage';
import MainDashboard from '../pages/Dashboard';
import QRCodeGenerator from '../pages/QRCodeGenerator';
import Whatsapp from '../pages/WhatsAppIntegration';
import PaymentRecordsPage from '../pages/PaymentRecordsPage';
import AddPatientModal from '../AddPatientModal';
import GeneratePDF from '../GeneratePDF';
import { API, graphqlOperation } from 'aws-amplify';
import { listPatients } from '../../graphql/queries';
import { createDoctor } from '../../graphql/mutations'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ signOut }) {
  const qrData = "https://www.yourwebsite.com";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElq, setAnchorElq] = React.useState(null);
  // State for current date and time
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    authToken: '',
  });
  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [findings, setFindings] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);

  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [guardianName, setGuardianName] = useState(''); // For storing parent/guardian name
  const [relationship, setRelationship] = useState(''); // For storing relationship
  const [selectedTreatments, setSelectedTreatments] = useState([]);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const showIOSViewer = false; 
  const pages = [
    <MainDashboard/>,
    <DemographyPage selectedPatient={selectedPatient} />,
    <ChiefComplaintPage 
    selectedPatient={selectedPatient}
    chiefComplaints={chiefComplaints}
    setChiefComplaints={setChiefComplaints}
    findings={findings}
    setFindings={setFindings}
    diagnosis={diagnosis}
    setDiagnosis={setDiagnosis}/>,
    <CasePhotos selectedPatient={selectedPatient}/>,
    <TreatmentSuggestedPage
    selectedPatient={selectedPatient} 
    leftValue={leftValue}
    setLeftValue={setLeftValue}
    rightValue={rightValue}
    setRightValue={setRightValue}
    guardianName={guardianName}
    setGuardianName={setGuardianName}
    relationship={relationship}
    setRelationship={setRelationship}
    selectedTreatments={selectedTreatments}
    setSelectedTreatments={setSelectedTreatments}/>,
    <IOSViewerPage selectedPatient={selectedPatient}/>,
    <TreatmentDonePage selectedPatient={selectedPatient}
    selectedTreatments={selectedTreatments}/>,
    <PaymentRecordsPage selectedPatient={selectedPatient}
    selectedTreatments={selectedTreatments}/>,
    <CompletePatientDetails selectedPatient={selectedPatient}/>,
    <StatisticsPage selectedPatient={selectedPatient}/>,
    <QRCodeGenerator value={qrData} />,
    <Whatsapp value={qrData} />,
    <GeneratePDF/>,
    <SpeakToText selectedPatient={selectedPatient}/>,
    <PrescriptionApp selectedPatient={selectedPatient}/>,
    <CalanderSyn selectedPatient={selectedPatient}/>,
    <Claude selectedPatient={selectedPatient}/>,
    <PrePostPage selectedPatient={selectedPatient}/>,
  ];
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [doctorID, setDoctorID] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');

  const specializations = [
    'General Practitioner',
    'Dentist',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
  ];
  const fetchUserDetails = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();
      
      setUserData({
        username: user.username,
        email: user.attributes.email,
        authToken: session.getIdToken().getJwtToken(), // Fetch Auth Token
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  const handleOpenProfileModal = async () => {
    await fetchUserDetails();  // Load user details before opening modal
    setIsProfileModalOpen(true);
  };
  
  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const handleOpenDoctorModal = () => {
    setIsDoctorModalOpen(true);
    handleClose(); // Close the menu
  };

  const handleCloseDoctorModal = () => {
    setIsDoctorModalOpen(false);
  };

  const handleAddDoctor = async () => {  // ✅ Add 'async' here
    const doctorData = {
      doctorName,
      doctorID,
      email,
      phone,
      specialization,
      experience: parseInt(experience),
    };
    try {
      const createResponse = await API.graphql({
        query: createDoctor,
        variables: { input: doctorData },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      if (createResponse.data) {
        toast.success('Doctor added successfully!', { position: "top-right" });
        setDoctorName('');
        setDoctorID('');
        setEmail('');
        setPhone('');
        setSpecialization('');
        setExperience('');
        handleCloseDoctorModal();
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearchChange = async (event, newNextToken = null) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
        setSearchResults([]);
        setNextToken(null);
        return;
    }

    setIsFetching(true);

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
        setSearchResults(prevResults => newNextToken ? [...prevResults, ...results] : results);
        setNextToken(response.data.listPatients.nextToken); // Update nextToken

    } catch (error) {
        console.error('Error fetching search results:', error);
    } finally {
        setIsFetching(false);
    }
};

const handleLoadMore = () => {
    if (nextToken) {
        handleSearchChange({ target: { value: searchQuery } }, nextToken);
    }
};

  const handleSearchFocus = (event) => {
    setAnchorElq(event.target);
  };
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery('');
    setSearchResults([]);
    setAnchorElq(null); 
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#343a40' }}> {/* Dynamic AppBar color based on tab */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Implant Patient Management
          </Typography>
          {/* Display selected patient information */}
        {selectedPatient && (
          <Typography variant="body2" sx={{ marginRight: 2, color: '#ffffff' }}>
            {selectedPatient.patientName} (ID: {selectedPatient.patientID})
          </Typography>
        )}
         {/* Display current date and time */}
        <Typography variant="body2" sx={{ marginRight: 2, color: '#ffffff' }}>
          {currentDateTime.date} | {currentDateTime.time}
        </Typography>

  <IconButton
  sx={{
    backgroundColor: '#6c757d',
    borderRadius: '20px',
    color: '#ffffff',
    padding: '6px',
    marginRight: 1,
    height: '40px', // Set the height to match the TextField
    width: '40px',  // Ensure it's square for an icon
    '&:hover': {
      backgroundColor: '#6c757d',
    },
  }}
  onClick={handleOpenModal}>
  <AddIcon /> {/* Replace with your desired Material-UI icon */}
</IconButton>

<TextField
  label="Search Patients"
  value={searchQuery}
  onChange={handleSearchChange}
  onFocus={handleSearchFocus}
  variant="outlined"
  size="small"
  sx={{
    marginRight: 1,
    backgroundColor: '#6c757d',
    borderRadius: '8px',
    height: '40px', // Set the height to match the button
    '& .MuiOutlinedInput-root': {
      height: '100%', // Ensure the input area takes up full height
      '& fieldset': {
        borderColor: '#6c757d',
      },
      '&:hover fieldset': {
        borderColor: '#6c757d',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffffff',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#ffffff', // Lighter color for label text
    },
    '& .MuiInputBase-input': {
      color: '#ffffff', // Input text color matching the base color
    },
    '&.Mui-focused .MuiInputLabel-root': {
      color: '#ffffff', // Label color when focused
    },
    padding: '0 0px',
  }}
/>
<Popper
  open={Boolean(anchorElq) && searchResults.length > 0} // Show Popper only if there are results
  anchorEl={anchorElq} // Anchor to the TextField
  placement="bottom-start" // Position it below the TextField (start aligned with the left)
  sx={{
    marginTop: '8px', // Adjust this value to move the Popper down (responsively)
    zIndex: 2000, // Ensure it stays above other components
  }}
>
  <Paper
    sx={{
      maxHeight: 200,
      overflowY: 'auto',
      width: anchorElq ? `${anchorElq.offsetWidth}px` : 'auto', // Dynamically set the width to match the TextField
      boxShadow: 3,
      backgroundColor: '#fff',
      borderRadius: 1,
    }}
  >
    {searchResults.map((patient) => (
      <MenuItem
        key={patient.id}
        onClick={() => handlePatientSelect(patient)}>
        {patient.patientName + " (" + patient.patientID + ")"}
      </MenuItem>
    ))}
  </Paper>
</Popper>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
    height: '40px', // Set the height to match the button and TextField
    width: '40px', // Ensure the width matches the height for a square icon button
    padding: 0, // Remove any default padding
    '& .MuiSvgIcon-root': {
        fontSize: '35px', // Adjust the icon size to fit within the button
    },
  }}>
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleOpenProfileModal}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleOpenDoctorModal}>Add Doctors</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                {loading ? (
                  <CircularProgress size={24} sx={{ marginRight: 1 }} />
                ) : (
                  'Logout'
                )}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {/* Add Patient Modal */}
      <AddPatientModal open={openModal} handleClose={handleCloseModal} />
      <Box sx={{ width: '100%', padding: '20px',marginTop: '40px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
            backgroundColor: '#6c757d',},}}>
          <Tab icon={<DashboardIcon />} iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Dashboard" />
          <Tab icon={<PersonIcon />} iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Demography" />
          <Tab icon={<LocalHospitalIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Notes" />
          <Tab icon={<VisibilityIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Case Photos" />
          <Tab icon={<HealthAndSafetyIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Treatment Consent" />
          <Tab icon={<FolderOpenIcon />} iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40'}}} label="IOS Viewer" />    
          <Tab icon={<DoneIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Treatment Done" />
          <Tab icon={<PaymentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Payment Records" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="List of Patients" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="List of Notes" />
          {showIOSViewer && (<Tab icon={<AssessmentOutlinedIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Pre/Post Page" />)}
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="QR Code" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Whats App" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="PDF Generate" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Speak to Text" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="Prescription" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="CalandarSyn" />
          <Tab icon={<AssessmentIcon />}iconPosition="start" sx={{'&.Mui-selected': {color: '#343a40',},}} label="ChatBot" />
        </Tabs>
        <Box sx={{ paddingTop: 2 }}>
          {pages[value]}
        </Box>
      </Box>
      {/* Add Doctor Modal */}
    <Modal open={isDoctorModalOpen} onClose={handleCloseDoctorModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>Add Doctor</Typography>
        <TextField
          margin="dense"
          label="Doctor Name"
          fullWidth
          variant="outlined"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="DCI Reg.No"
          fullWidth
          variant="outlined"
          value={doctorID}
          onChange={(e) => setDoctorID(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          fullWidth
          variant="outlined"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          margin="dense"
          select
          label="Specialization"
          fullWidth
          variant="outlined"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          {specializations.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Years of Experience"
          fullWidth
          variant="outlined"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleAddDoctor} sx={{
          backgroundColor: '#343a40',
          color: '#f8f9fa',
          '&:hover': {
            backgroundColor: '#23272b',
          },
        }} variant="contained">Add</Button>
        </Box>
      </Box>
    </Modal>
<Modal
  open={isProfileModalOpen}
  onClose={handleCloseProfileModal}
  aria-labelledby="profile-modal-title"
  aria-describedby="profile-modal-description">
  <Paper sx={{ padding: 3, width: 400, margin: 'auto', marginTop: '10%', textAlign: 'center' }}>
    <Typography variant="h6" id="profile-modal-title" gutterBottom>
      User Profile
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />

    <Typography variant="body1"><strong>Username:</strong> {userData.username}</Typography>
    <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>

    <Button variant="contained" onClick={handleCloseProfileModal} sx={{ marginTop: 2 }}>
      Close
    </Button>
  </Paper>
</Modal>

    <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
