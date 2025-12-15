const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
  },
  { timestamps: true }
);

// This pattern avoids OverwriteModelError if file is imported twice
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
