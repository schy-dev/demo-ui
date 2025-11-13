'use client';

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
console.log(process.env.NEXT_PUBLIC_API_URL, "API_BASE");
export const axiosClient = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});
