const express = require('express');
const cors = require('cors');

const app = express();
const port = 5002;

app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable CORS for all origins

// Dummy parking lot data (replace with real data)
const parkingLots = [
  { id: 1, name: 'Parking Lot 1', lat: 40.7128, lng: -74.0060, spots: 10, rate: 10 },
  { id: 2, name: 'Parking Lot 2', lat: 40.7328, lng: -74.0160, spots: 5, rate: 15 },
  { id: 3, name: 'Parking Lot 3', lat: 40.7528, lng: -74.0260, spots: 8, rate: 12 },
];

// API to recommend the nearest parking spots
app.post('/api/recommend-parking', (req, res) => {
  const { lat, lng, budget, time } = req.body;

  // Simple recommendation logic (for demo purposes)
  const recommended = parkingLots.filter(lot => lot.rate <= budget);

  // Sort by distance (basic Euclidean distance calculation)
  recommended.sort((a, b) => {
    const distanceA = Math.sqrt(Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2));
    const distanceB = Math.sqrt(Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2));
    return distanceA - distanceB;
  });

  // Return the top 5 nearest available parking spots
  res.json(recommended.slice(0, 5));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
