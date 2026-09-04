const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      trim: true
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: false
    },
    providerName: {
      type: String,
      default: 'General Service Provider',
      trim: true
    },
    service: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    problem: {
      type: String,
      required: [true, 'Problem description is required'],
      trim: true
    },
    preferredDate: {
      type: String,
      required: [true, 'Preferred service date is required']
    },
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to generate human-readable FL-1001 requestId format
serviceRequestSchema.pre('save', async function (next) {
  if (!this.requestId) {
    try {
      const count = await mongoose.model('ServiceRequest').countDocuments();
      const num = 1001 + count;
      this.requestId = `FL-${num}`;
    } catch (err) {
      // Fallback random code if count error occurs
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      this.requestId = `FL-${randomDigits}`;
    }
  }
  next();
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
