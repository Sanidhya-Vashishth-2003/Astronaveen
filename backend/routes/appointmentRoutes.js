// backend/routes/appointmentRoutes.js
const express = require('express');
const Appointment = require('../models/Appointment');

const router = express.Router();

// POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, preferredDate } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ msg: 'Name, email, and phone are required' });
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      message,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
    });

    res.status(201).json({ msg: 'Appointment booked', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
