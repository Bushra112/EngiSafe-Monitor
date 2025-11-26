import axios from "axios";

const API = "http://127.0.0.1:5000/workers";

export const getWorkers = () => axios.get(API + "/");
export const createWorker = (data) => axios.post(API + "/", data);
export const updateWorker = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteWorker = (id) => axios.delete(`${API}/${id}`);
