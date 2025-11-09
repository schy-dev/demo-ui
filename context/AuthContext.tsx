'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { axiosClient } from '@/lib/axiosClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Attach token automatically
  useEffect(() => {
    const requestInterceptor = axiosClient.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosClient.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  // 🔹 Login
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/api/auth/login', { email, password });
      localStorage.setItem("accessToken", data.accessToken);
      setAccessToken(data.accessToken);
      setUser(data.user);
      router.push('/dashboard');
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // 🔹 Logout
  const logout = useCallback(async () => {
    try {
      await axiosClient.post('/api/auth/logout');
    } catch {
      /* ignore */
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.setItem("accessToken", "");
      router.push('/login');
    }
  }, [router]);

  // 🔹 Fetch current user on mount (via refresh token)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await axiosClient.post('/api/auth/refresh');

        setAccessToken(data.accessToken);
        setUser(data.user);
      } catch (err) {
        console.log(err);
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
