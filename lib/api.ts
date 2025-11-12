// import axios from 'axios';

// // Create axios instance
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
//   withCredentials: true, // send refresh cookie
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   console.log(config.headers.Authorization, "config")
//   return config;
// });

// // 🔹 If access token expired → call refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes('/auth/refresh')
//     ) {
//       originalRequest._retry = true;
//       try {
//         // call refresh API — must send refresh cookie
//         const refreshRes = await api.post('/api/auth/refresh', null, { withCredentials: true });
//         const newToken = refreshRes.data?.accessToken;

//         if (newToken) {
//           localStorage.setItem('accessToken', newToken);
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return api(originalRequest); // retry original request
//         }
//       } catch (err) {
//         console.error('Token refresh failed:', err);
//         localStorage.removeItem('accessToken');
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  withCredentials: true, // so cookies like refresh tokens still work
});

export default api;



