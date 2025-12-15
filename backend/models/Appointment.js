const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    preferredDate: { type: Date },
  },
  { timestamps: true }
);

// ✅ Correct model name here:
module.exports =
  mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
