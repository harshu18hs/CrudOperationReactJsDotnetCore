const logToServer = (message) => {
    fetch('http://localhost:5000/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Log successfully sent to server.');
      } else {
        console.error('Failed to send log to server.');
      }
    })
    .catch((err) => {
      console.error('Error sending log to server:', err);
    });
  };
  