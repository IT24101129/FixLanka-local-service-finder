/**
 * Calculates a rule-based Smart Match score (0-100%) for a provider
 * based on customer search requirements.
 *
 * Weightings:
 * - Service Match: 40%
 * - Location Match: 30%
 * - Availability Match: 20%
 * - Provider Rating: 10%
 */

export const calculateSmartMatch = (provider, criteria = {}) => {
  let score = 0;
  const breakdown = [];

  const targetService = criteria.service || 'Electrician';
  const targetLocation = criteria.location || 'Kandy';

  // 1. Service Match (40 Points)
  if (provider.service && provider.service.toLowerCase() === targetService.toLowerCase()) {
    score += 40;
    breakdown.push({ factor: 'Service Trade Match', points: 40, max: 40, status: 'Exact Match' });
  } else if (criteria.service === 'All' || !criteria.service) {
    score += 30;
    breakdown.push({ factor: 'Service Category Fit', points: 30, max: 40, status: 'General Match' });
  } else {
    breakdown.push({ factor: 'Service Trade Match', points: 0, max: 40, status: 'Different Trade' });
  }

  // 2. Location Match (30 Points)
  if (provider.location && provider.location.toLowerCase() === targetLocation.toLowerCase()) {
    score += 30;
    breakdown.push({ factor: 'Sri Lankan Location', points: 30, max: 30, status: 'Same District/City' });
  } else if (criteria.location === 'All' || !criteria.location) {
    score += 20;
    breakdown.push({ factor: 'Sri Lankan Location', points: 20, max: 30, status: 'Regional Service Area' });
  } else {
    score += 10;
    breakdown.push({ factor: 'Sri Lankan Location', points: 10, max: 30, status: 'Neighboring Town' });
  }

  // 3. Availability Match (20 Points)
  if (provider.availability === 'Available Today') {
    score += 20;
    breakdown.push({ factor: 'Immediate Availability', points: 20, max: 20, status: 'Available Today' });
  } else if (provider.availability === 'Available Tomorrow') {
    score += 15;
    breakdown.push({ factor: 'Immediate Availability', points: 15, max: 20, status: 'Available Tomorrow' });
  } else {
    score += 5;
    breakdown.push({ factor: 'Immediate Availability', points: 5, max: 20, status: provider.availability });
  }

  // 4. Rating Factor (10 Points)
  const ratingScore = Math.min(10, Math.round(((provider.rating || 4.5) / 5) * 10));
  score += ratingScore;
  breakdown.push({ factor: 'Customer Rating & Experience', points: ratingScore, max: 10, status: `${provider.rating || 4.5}/5.0 Stars` });

  // Tier Classification
  let label = 'Possible Match';
  let badgeColor = 'badge-cancelled';

  if (score >= 85) {
    label = 'Excellent Match';
    badgeColor = 'badge-completed';
  } else if (score >= 60) {
    label = 'Good Match';
    badgeColor = 'badge-accepted';
  }

  return {
    score,
    label,
    badgeColor,
    breakdown
  };
};
