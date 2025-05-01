import React, { useState, useRef, useEffect } from 'react';
import { invokeClaude } from './bedrockClient';
import ReactMarkdown from 'react-markdown';

const ClaudeChat = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const invokeClaudeWithRetry = async (input, maxRetries = 5) => {
    let attempts = 0;
    let delay = 1000;

    while (attempts < maxRetries) {
      try {
        return await invokeClaude(input);
      } catch (error) {
        if (
          error.name === 'ThrottlingException' ||
          (error.message && error.message.includes('Too many requests'))
        ) {
          console.warn(`Throttled. Retrying in ${delay}ms...`);
          await sleep(delay);
          attempts++;
          delay *= 2;
        } else {
          throw error;
        }
      }
    }

    throw new Error('Too many requests. Please try again later.');
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMsg = { role: 'user', text: userInput };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const reply = await invokeClaudeWithRetry(userInput);
      const aiMsg = { role: 'claude', text: reply };
      setMessages((prev) => [...prev, aiMsg]);

      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'claude', text: error.message || 'Error fetching response.' },
      ]);
    }

    setUserInput('');
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is only supported in Chrome.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput((prev) => prev + transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleExportChat = () => {
    const content = messages
      .map((msg) => `${msg.role === 'user' ? 'You' : 'Claude'}: ${msg.text}`)
      .join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'claude_chat_history.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Claude 3 Chat</h2>

      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          minHeight: 200,
          maxHeight: 400,
          overflowY: 'auto',
          marginBottom: 10,
          borderRadius: 6,
          background: '#f9f9f9',
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong style={{ color: msg.role === 'user' ? '#007bff' : '#28a745' }}>
              {msg.role === 'user' ? 'You' : 'Claude'}:
            </strong>
            <ReactMarkdown style={{ margin: 4 }}>{msg.text}</ReactMarkdown>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <textarea
        rows={3}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Claude something... (Enter to send, Shift+Enter for newline)"
      />

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
        <button onClick={handleSpeechInput}>
          {isListening ? 'Listening...' : '🎤 Speak'}
        </button>
        <button onClick={handleExportChat}>📤 Export</button>
      </div>
    </div>
  );
};

export default ClaudeChat;
