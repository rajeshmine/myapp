import http from "./HttpService";
import { apiUrl } from "../config.json";

export function checkuser(data) {
    return http.post(`${apiUrl}/users/login`, data);
}

export function signup(data) {
    return http.post(`${apiUrl}/users/signup`, data);
}