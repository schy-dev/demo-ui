// lib/auth.ts
export const authTokenKey = 'auth:token';

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem(authTokenKey));
}

export function loginMock(token = 'mock-token') {
  if (typeof window === 'undefined') return;
  localStorage.setItem(authTokenKey, token);
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(authTokenKey);
}
