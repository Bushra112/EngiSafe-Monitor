import axios from "axios";

const API = "https://engisafe-monitor.onrender.com/incidents";

export const getIncidents = () => axios.get(API);

export const createIncident = (formData) =>
  axios.post(API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateIncident = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteIncident = (id) =>
  axios.delete(`${API}/${id}`);
