import http from "./HttpService";
import { apiUrl } from "../config.json";

export function transaction(data) {
    return http.post(`${apiUrl}/users/login`, data);
}
