import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClassifyMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://email-spam-ze4a.onrender.com/predict', { message });
      setResult(response.data.prediction);
      setError(null);
    } catch (err) {
      setError('Error classifying the message. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Email Spam Detection</h1>
      <form onSubmit={handleClassifyMessage} style={styles.form}>
        <label htmlFor="message" style={styles.label}>
          Enter your message:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message to classify as spam or ham"
          rows="4"
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          {loading ? 'Classifying...' : 'Classify Message'}
        </button>
      </form>
      {result && (
        <div style={styles.result}>
          <strong>Result:</strong> The message is classified as: <strong>{result}</strong>
        </div>
      )}
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

const styles = {
  appBackground: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', 
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
},
  heading: {
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#555',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    resize: 'vertical',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    marginBottom: '15px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45A049',
  },
  result: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#4CAF50',
    fontWeight: '500',
  },
  error: {
    color: 'red',
    marginTop: '20px',
    fontSize: '16px',
  },
};

// Apply hover effect to the button using onMouseEnter and onMouseLeave
const ButtonWithHover = ({ children, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      {...props}
      style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default App;
