import jwtDecode from "jwt-decode";
export function getuser() {
    try {
        const jwt = localStorage.getItem("token");
        let user = jwtDecode(jwt);
        return user;
    } catch (ex) {
        return null;
    }
}