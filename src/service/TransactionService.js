import http from "./HttpService";
import { apiUrl } from "../config.json";

export function list() {
    return http.get(`${apiUrl}/transation/list`);
}

export function sendmoney(data) {
    return http.post(`${apiUrl}/transation/send`, data);
}

export function getAllUser() {
    return http.get(`${apiUrl}/users/getalluser`);
}
export function loadmoney(data) {
    return http.post(`${apiUrl}/bank/loadmoney`, data);
}

export function getAmountDetails(data) {
    return http.post(`${apiUrl}/bank/getAmountDetails`, data);
}
