const API_BASE_URL = '/api';

export const fetchKPIs = async () => {
  const response = await fetch(`${API_BASE_URL}/kpis`);
  if (!response.ok) throw new Error('Failed to fetch KPIs');
  return response.json();
};

export const fetchExceptions = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all') {
      params.append(key, value);
    }
  });
  
  const response = await fetch(`${API_BASE_URL}/exceptions?${params}`);
  if (!response.ok) throw new Error('Failed to fetch exceptions');
  return response.json();
};

export const fetchExceptionDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/exceptions/${id}`);
  if (!response.ok) throw new Error('Failed to fetch exception details');
  return response.json();
};

export const fetchTrends = async () => {
  const response = await fetch(`${API_BASE_URL}/trends`);
  if (!response.ok) throw new Error('Failed to fetch trends');
  return response.json();
};

export const fetchShipments = async () => {
  const response = await fetch(`${API_BASE_URL}/shipments`);
  if (!response.ok) throw new Error('Failed to fetch shipments');
  return response.json();
};

export const fetchInventory = async () => {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  if (!response.ok) throw new Error('Failed to fetch inventory');
  return response.json();
};

export const submitExceptionAction = async (id, action, assignee, notes) => {
  const response = await fetch(`${API_BASE_URL}/exceptions/${id}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, assignee, notes })
  });
  if (!response.ok) throw new Error('Failed to submit action');
  return response.json();
};
