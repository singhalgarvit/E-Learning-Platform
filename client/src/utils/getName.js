import { jwtDecode } from "jwt-decode";

const getName = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.name; 
    } catch (error) {
        console.error("Token decoding failed", error);
        return null;
    }
};

export default getName;
