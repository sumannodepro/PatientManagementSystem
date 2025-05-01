import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const clientId = '355857410167-cm8o3homlbd691sidhnr2flqflvv2igr.apps.googleusercontent.com'; // 🔁 Replace this with your actual Client ID

function CalanderSyn() {
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);

  const onSuccess = async (res) => {
    const token = res.accessToken;
    setAccessToken(token);
    await fetchEvents(token);
  };

  const onFailure = (res) => {
    console.error('Login failed', res);
  };

  const fetchEvents = async (token) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.items) {
        const formattedEvents = data.items.map((event) => ({
          title: event.summary || '(No Title)',
          start: new Date(event.start?.dateTime || event.start?.date),
          end: new Date(event.end?.dateTime || event.end?.date),
        }));
        setEvents(formattedEvents);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {!accessToken ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          scope="https://www.googleapis.com/auth/calendar.readonly"
          responseType="token"
        />
      ) : (
        <div>
          <h2>Your Google Calendar Events</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, marginTop: 20 }}
          />
        </div>
      )}
    </div>
  );
}

export default CalanderSyn;
