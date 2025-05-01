import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // WhatsApp icon
import { MdAssessment } from 'react-icons/md'; // Assessment icon

const mockContacts = [
  { id: 1, name: 'Suman Bohra', phone: '+919884158810' },
  { id: 2, name: 'Jay', phone: '+918903680729' },
  { id: 3, name: 'Dinesh', phone: '+919944896292' },
];

const mockMessages = {
  '+919884158810': [
    { text: 'Hey Suman Bohra!', sender: 'You', timestamp: '10:00 AM' },
    { text: 'Hello! How are you?', sender: 'Suman Bohra', timestamp: '10:01 AM' },
  ],
  '+918903680729': [
    { text: 'Hi Jay!', sender: 'You', timestamp: '11:00 AM' },
    { text: 'Hey! What’s up?', sender: 'Jay', timestamp: '11:02 AM' },
  ],
  '+919944896292': [
    { text: 'Hello Dinesh!', sender: 'You', timestamp: '12:30 PM' },
    { text: 'Hi there!', sender: 'Dinesh', timestamp: '12:31 PM' },
  ],
};

const WhatsAppIntegration = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages[selectedContact.phone] || []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessages = [...messages, { text: message, sender: 'You', timestamp: new Date().toLocaleTimeString() }];
    setMessages(newMessages);
    setMessage('');
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
    setMessages(mockMessages[contact.phone] || []);
  };

  return (
    <div style={{ display: 'flex', height: '500px', border: '1px solid #ddd', borderRadius: '8px' }}>
      {/* Contacts List */}
      <div style={{ width: '30%', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <h3 style={{ padding: '10px', backgroundColor: '#f7f7f7' }}>Contacts</h3>
        {mockContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => selectContact(contact)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: selectedContact.id === contact.id ? '#e0e0e0' : 'transparent',
            }}
          >
            {contact.name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ padding: '10px', backgroundColor: '#f7f7f7' }}>{selectedContact.name}</h3>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px', borderBottom: '1px solid #ddd' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'You' ? 'right' : 'left', marginBottom: '5px' }}>
              <span style={{ display: 'inline-block', padding: '8px', borderRadius: '5px', backgroundColor: msg.sender === 'You' ? '#dcf8c6' : '#e5e5ea' }}>
                {msg.text}
              </span>
              <br /><small>{msg.timestamp}</small>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px', display: 'flex' }}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ flex: 1, padding: '8px', marginRight: '10px' }}
          />
          <button onClick={sendMessage} style={{ padding: '8px', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '5px' }}>
            <FaWhatsapp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;
