import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem,IconButton } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import CloseIcon from '@mui/icons-material/Close';
import { listPatients } from '../graphql/queries';
import { createPatient } from '../graphql/mutations';
import { createLastRecordID } from '../graphql/mutations';
import { updateLastRecordID } from '../graphql/mutations';
import { getLastRecordID } from '../graphql/queries';
import { Auth } from 'aws-amplify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddPatientModal({ open, handleClose }) {
 
  const [formData, setFormData] = useState({
    patientID: '',
    title: '',
    patientName: '',
    mobileNumber: '',
    emailId: '',
    address: '',
    dateOfBirth: '',
    age: '',
    bloodGroup: '',
    gender: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateBlur = () => {
    const { dateOfBirth } = formData;

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
      setError('Please enter the date in dd/mm/yyyy format.');
      return;
    }

    setError('');
    const [day, month, year] = dateOfBirth.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    setFormData((prevData) => ({
      ...prevData,
      age: age.toString(),
    }));
  };

  const resetFormData = () => {
    setFormData({
      patientID: '',
      title: '',
      patientName: '',
      mobileNumber: '',
      emailId: '',
      address: '',
      dateOfBirth: '',
      age: '',
      bloodGroup: '',
      gender: '',
    });
  };
  useEffect(() => {
    if (open) {
      fetchNewPatientID();
    }
  }, [open]);
  const fetchNewPatientID = async () => {
    try {
      const response = await API.graphql({
        query: getLastRecordID,
        variables: { id: "8a4a5f94-ded2-4078-9fa6-43b6032a65c0" }, // Replace with the correct ID
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      if (response.data && response.data.getLastRecordID) {
        setFormData((prev) => ({
          ...prev,
          patientID: response.data.getLastRecordID.newPatientID.toString(),
        }));
      }
    } catch (error) {
      console.error("Error fetching newPatientID:", JSON.stringify(error, null, 2));
    }
  };
  
  const handleSubmit = async () => {
    try {
      const { patientID, patientName, title, mobileNumber, emailId, address, dateOfBirth, age, bloodGroup, gender } = formData;
  
      // Trim values before validation
      if (
        !patientName.trim() || !title.trim() || !mobileNumber.trim() ||
        !emailId.trim() || !address.trim() || !dateOfBirth.trim() ||
        !age.trim() || !bloodGroup.trim() || !gender.trim() ||
        !patientID.trim()
      ) {
        toast.error('Please fill in all required fields.', { position: "top-right" });
        return;
      }
  
      // Format Date of Birth properly
      const formattedDateOfBirth = dateOfBirth.includes('/') 
        ? dateOfBirth.split('/').reverse().join('-') 
        : dateOfBirth;
  
      // Retrieve Auth Token safely
      let authToken;
      try {
        authToken = await Auth.currentSession().then((session) =>
          session.getIdToken().getJwtToken()
        );
      } catch (authError) {
        console.error('Authentication error:', authError);
        toast.error('Authentication error. Please log in again.', { position: "top-right" });
        return;
      }
  
      const input = {
        patientID,
        title,
        patientName,
        mobileNumber,
        emailId,
        address,
        dateOfBirth: formattedDateOfBirth,
        age: parseInt(age, 10),
        bloodGroup,
        gender,
      };
  
      // **Create Patient**
      const createResponse = await API.graphql({
        query: createPatient,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      if (createResponse.errors) {
        console.error('Error creating patient:', createResponse.errors);
        toast.error(`Error: ${createResponse.errors[0].message}`, { position: "top-right" });
        return;
      }
  
      if (createResponse.data) {
        const newPatientID = parseInt(patientID, 10) + 1; // Increment the patient ID
  
        // **Directly update the last record (since only one row exists)**
        const lastRecordInput = {
          id: "8a4a5f94-ded2-4078-9fa6-43b6032a65c0", // Assuming you use a fixed ID
          lastPatientID: parseInt(patientID, 10),
          newPatientID,
        };
  
        const updateLastRecordResponse = await API.graphql({
          query: updateLastRecordID, // Mutation to update the row
          variables: { input: lastRecordInput },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          headers: { Authorization: `Bearer ${authToken}` },
        });
  
        if (updateLastRecordResponse.errors) {
          console.error('Error updating last record ID:', updateLastRecordResponse.errors);
          toast.error(`Error: ${updateLastRecordResponse.errors[0].message}`, { position: "top-right" });
          return;
        }
  
        toast.success('Patient added successfully!', { position: "top-right" });
        handleClose();
        resetFormData();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred while submitting patient data.', { position: "top-right" });
    }
  };
  

  const generatePatientID = (patientName) => {
    const firstLetter = patientName.trim()[0].toUpperCase();
    return `${firstLetter}-${Date.now()}`; // Example ID generation
  };
  
  const handleCloseBtn = () => {
    handleClose();
    resetFormData();  // Clear the form fields when closing
  };
  
  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={{
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       width: '90%',  // Adjusts to screen size
       maxWidth: '500px', // Maximum width for larger screens
       maxHeight: '90vh', // Prevents overflow on small screensx
       backgroundColor: 'white',
       padding: 2,
       borderRadius: 2,
       display: 'flex',
       flexDirection: 'column',
       boxShadow: 24,
       overflowY: 'auto',
      }}>
         <Box
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 1,
            borderBottom: '1px solid #ddd',
          }}
        >
          <h2 style={{ margin: 0 }}>Add Patient</h2>
          <IconButton
            onClick={handleCloseBtn}
            sx={{
              color: '#343a40',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            paddingTop: 2,
          }}
        >
        <FormControl fullWidth sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}>
            
          <InputLabel>Title</InputLabel>
          <Select
            value={formData.title}
            onChange={handleChange}
            label="Title"
            name="title"
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
            <MenuItem value="Baby">Baby</MenuItem>
            <MenuItem value="Master">Master</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Patient Name"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          fullWidth

          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}
        />
        <TextField
          label="Patient ID"
          name="patientID"
          value={formData.patientID}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}
        />
        <TextField
          label="Date of Birth (dd/mm/yyyy)"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          onBlur={handleDateBlur}
          error={!!error}
          helperText={error}
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}
        />

        <TextField
          label="Age"
          name="age"
          value={formData.age}
          disabled
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}
        />

        <FormControl fullWidth sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
            name="gender"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}>
          <InputLabel>Blood Group</InputLabel>
          <Select
            value={formData.bloodGroup}
            onChange={handleChange}
            label="Blood Group"
            name="bloodGroup"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}
        />

        <TextField
          label="Mobile Number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}
        />
        <TextField
          label="Email ID"
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#343a40', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#343a40', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#343a40', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused and normal
            },
            '& .MuiInputBase-input': {
              color: '#343a40', // Input text color
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: '#343a40', // Label color when focused
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            marginRight: 2,
            backgroundColor: '#6c757d',
            '&:hover': {
              backgroundColor: '#5a6268',
            },
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={handleCloseBtn}
          sx={{
            backgroundColor: '#6c757d',
            '&:hover': {
              backgroundColor: '#5a6268',
            },
          }}>
          Close
        </Button>
      </Box>
      </Box>
    </Modal>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
