import axios from "axios";

const API = "https://engisafe-monitor.onrender.com/workers";

export const getWorkers = () => axios.get(API + "/");
export const createWorker = (data) => axios.post(API + "/", data);
export const deleteWorker = (id) => axios.delete(`${API}/${id}`);
