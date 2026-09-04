// IT24101129: Provider data model and schema definition
const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Provider name is required'],
      trim: true
    },
    service: {
      type: String,
      required: [true, 'Service trade is required'],
      enum: ['Electrician', 'Plumber', 'Mechanic', 'AC Technician', 'Carpenter', 'Painter'],
      default: 'Electrician'
    },
    location: {
      type: String,
      required: [true, 'Sri Lankan location is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5
    },
    experience: {
      type: String,
      required: [true, 'Experience level is required'],
      default: '3+ Years'
    },
    availability: {
      type: String,
      required: [true, 'Availability status is required'],
      enum: ['Available Today', 'Available Tomorrow', 'Weekend Only', 'Busy'],
      default: 'Available Today'
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Add index for search query performance
providerSchema.index({ name: 'text', service: 'text', location: 'text', description: 'text' });

module.exports = mongoose.model('Provider', providerSchema);
