import axios from "axios";
const API = "http://127.0.0.1:5000/incidents";

export const getIncidents = () => axios.get(API);

export const createIncident = (formData) =>
  axios.post(API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateIncident = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteIncident = (id) =>
  axios.delete(`${API}/${id}`);
