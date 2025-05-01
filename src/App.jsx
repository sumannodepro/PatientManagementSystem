import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, defaultTheme, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Ensure you include Amplify's default styles
import { Auth } from '@aws-amplify/auth';
import { useEffect, useState } from 'react';
import Dashboard from './component/Dashboard/Dashboard';
import AddPatientModal from './component/AddPatientQR'; // Import the modal

const myTheme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#6c757d' },
      },
      font: {
        primary: { value: '#ffffff' },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '#6c757d' },
          color: { value: '#ffffff' },
          _hover: {
            backgroundColor: { value: '#5b636a' },
          },
        },
      },
    },
  },
};

function App({ user, signOut }) {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const user = await Auth.currentUserInfo();
        console.log('Current User:', user);
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        setAuthToken(token);
        console.log('Auth Token:', token);
        const credentials = await Auth.currentCredentials();
        console.log('Auth credentials:',credentials);
       
        
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    if (user) {
      fetchAuthToken();
    }
  }, [user]);

  return (
    <ThemeProvider theme={{ ...defaultTheme, ...myTheme }}>
      <Router>
        <div className="App">
          <Routes>
            {/* Main Dashboard */}
            <Route path="/*" element={<Dashboard user={user} signOut={signOut} authToken={authToken} />} />
            
            {/* Add Patient Modal Route */}
            <Route path="/add-patient" element={<AddPatientModal />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
