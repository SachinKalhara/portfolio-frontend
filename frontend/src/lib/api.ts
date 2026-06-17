// src/lib/api.ts
import axios from 'axios';

// 1. අලුත් Axios instance එකක් සෑදීම
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://portfolio-backend-production-cca6.up.railway.app/projects',
});
//'http://localhost:5000'||
// 2. Request Interceptor එක (යවන හැම request එකකටම Token එක ස්වයංක්‍රීයව දැමීම)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers['x-auth-token'] = token; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor එක (Token එක expire වෙලා නම් හෝ වැරදි නම් ස්වයංක්‍රීයව logout කිරීම)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin'; // ආපසු Login පිටුවට යැවීම
        }
        return Promise.reject(error);
    }
);

export default api;