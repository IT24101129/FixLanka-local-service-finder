// Centralized API client for FixLanka frontend

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper handling HTTP status checks and JSON parsing
 */
const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API Request Failed (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error(`[API Service Error] ${endpoint}:`, error.message);
    throw error;
  }
};

/* ================= PROVIDER API SERVICES ================= */

export const getProviders = async (queryParams = {}) => {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'All') {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  const endpoint = `/providers${queryString ? `?${queryString}` : ''}`;
  return request(endpoint, { method: 'GET' });
};

export const getProvider = async (id) => {
  return request(`/providers/${id}`, { method: 'GET' });
};

export const createProvider = async (providerData) => {
  return request('/providers', {
    method: 'POST',
    body: JSON.stringify(providerData)
  });
};

export const updateProvider = async (id, providerData) => {
  return request(`/providers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(providerData)
  });
};

export const deleteProvider = async (id) => {
  return request(`/providers/${id}`, { method: 'DELETE' });
};

/* ================= SERVICE REQUEST API SERVICES ================= */

export const getRequests = async () => {
  return request('/requests', { method: 'GET' });
};

export const getRequest = async (id) => {
  return request(`/requests/${id}`, { method: 'GET' });
};

export const createRequest = async (requestData) => {
  return request('/requests', {
    method: 'POST',
    body: JSON.stringify(requestData)
  });
};

export const updateRequest = async (id, requestData) => {
  return request(`/requests/${id}`, {
    method: 'PUT',
    body: JSON.stringify(requestData)
  });
};

export const updateRequestStatus = async (id, status) => {
  return request(`/requests/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
};

export const deleteRequest = async (id) => {
  return request(`/requests/${id}`, { method: 'DELETE' });
};
