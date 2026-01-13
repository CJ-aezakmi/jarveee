import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  refreshToken: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
};

// Accounts API
export const accountsAPI = {
  getAll: () => api.get('/accounts'),
  getOne: (id: string) => api.get(`/accounts/${id}`),
  create: (data: any) => api.post('/accounts', data),
  update: (id: string, data: any) => api.patch(`/accounts/${id}`, data),
  delete: (id: string) => api.delete(`/accounts/${id}`),
};

// Campaigns API
export const campaignsAPI = {
  getAll: () => api.get('/campaigns'),
  getOne: (id: string) => api.get(`/campaigns/${id}`),
  create: (data: any) => api.post('/campaigns', data),
  update: (id: string, data: any) => api.patch(`/campaigns/${id}`, data),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
};

// Tasks API
export const tasksAPI = {
  getAll: (params?: any) => api.get('/tasks', { params }),
  getOne: (id: string) => api.get(`/tasks/${id}`),
  create: (data: any) => api.post('/tasks', data),
  getStatistics: () => api.get('/tasks/statistics'),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getAccountAnalytics: (id: string, period: string) =>
    api.get(`/analytics/account/${id}`, { params: { period } }),
  getCampaignAnalytics: (id: string) => api.get(`/analytics/campaign/${id}`),
};

export default api;
