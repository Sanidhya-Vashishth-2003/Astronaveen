// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db.js');

dotenv.config();
connectDB();
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const app = express();

app.use(cors());
app.use(express.json());
// server.js
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/kundali", require("./routes/KundaliRoutes.js"));
app.use("/api/compatibility", require("./routes/compatibilityRoutes")); // ⬅️ NEW

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes.js'));
app.use('/api/kundali', require('./routes/KundaliRoutes.js'));

// Simple Panchang endpoint (static demo)
app.get('/api/panchang', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json({
    date: today,
    tithi: 'Shukla Paksha Dashami',
    nakshatra: 'Rohini',
    yoga: 'Shubha',
    karana: 'Bava',
    sunrise: '06:10 AM',
    sunset: '06:02 PM',
    imageUrl: 'https://via.placeholder.com/400x200?text=Daily+Panchang', // replace with real image later
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
