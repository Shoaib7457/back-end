// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: 'https://front-end-pi-gules.vercel.app/', // allow requests from your frontend
    credentials: true
}));
// // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'maps/build')));

// // Serve React app for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'maps/build', 'index.html'));
});

// app.get('/api/vehicle', (req, res) => {
//   const dataPath = path.join('data', 'vehicledata.json');
  
//   fs.readFile(dataPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading vehicle data:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     // Parse and send the data as JSON
//     const vehicleData = JSON.parse(data);
//     res.json(vehicleData);
//   });
// });

let currentIndex = 0;
app.get("/" , (req , res) =>{
  let currentIndex = 0;
});
app.get('/api/vehicle/current', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'vehicledata.json');

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading vehicle data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const vehicleData = JSON.parse(data);
    
    // Simulate real-time vehicle data by incrementing index
    if (currentIndex >= vehicleData.length) {
      currentIndex = 0;
    }
    
    const currentVehiclePosition = vehicleData[currentIndex];
    currentIndex++;

    res.json(currentVehiclePosition);
  });
});


app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
