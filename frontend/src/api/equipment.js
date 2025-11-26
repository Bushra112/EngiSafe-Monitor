import axios from "axios";

const API = "https://engisafe-monitor.onrender.com/equipment";

export const getEquipment = () => axios.get(API + "/");
export const createEquipment = (data) => axios.post(API + "/", data);
export const updateEquipment = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteEquipment = (id) => axios.delete(`${API}/${id}`);
