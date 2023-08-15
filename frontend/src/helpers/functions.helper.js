import jwt_decode from "jwt-decode";

export function getTokenId() {
    const token = localStorage.getItem("token");

    if (!token) {
        return null
    }

    const id = jwt_decode(token).sub;

    if (!token) {
        return null
    }

    return id
}