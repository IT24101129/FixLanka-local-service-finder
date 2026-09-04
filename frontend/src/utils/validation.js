// Client-side validation for FixLanka Service Requests

export const validateServiceRequest = (formData) => {
  const errors = {};

  // Customer Name Validation
  if (!formData.customerName || !formData.customerName.trim()) {
    errors.customerName = 'Customer name is required';
  } else if (formData.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters';
  }

  // Contact Number Validation (Sri Lankan Format Support)
  // E.g. 0712345678, +94771234567, 0812223344
  const slPhoneRegex = /^(?:\+94|0)?7[0-9]{8}$|^(?:\+94|0)?[1-9][0-9]{8}$/;
  if (!formData.contactNumber || !formData.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else {
    const sanitizedPhone = formData.contactNumber.replace(/[\s-]/g, '');
    if (!slPhoneRegex.test(sanitizedPhone)) {
      errors.contactNumber = 'Enter a valid Sri Lankan phone number (e.g., 0771234567 or 0812223344)';
    }
  }

  // Service Validation
  if (!formData.service || !formData.service.trim()) {
    errors.service = 'Please select a service trade';
  }

  // Location Validation
  if (!formData.location || !formData.location.trim()) {
    errors.location = 'Sri Lankan location is required';
  }

  // Problem Description Validation
  if (!formData.problem || !formData.problem.trim()) {
    errors.problem = 'Problem description is required';
  } else if (formData.problem.trim().length < 10) {
    errors.problem = 'Please provide a detailed description (at least 10 characters)';
  }

  // Preferred Date Validation
  if (!formData.preferredDate) {
    errors.preferredDate = 'Preferred service date is required';
  } else {
    const selectedDate = new Date(formData.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.preferredDate = 'Service date cannot be in the past';
    }
  }

  // Urgency Validation
  if (!formData.urgency) {
    errors.urgency = 'Please select urgency level';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
