// src/redux/actions/authActions.ts
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const LOGOUT = 'LOGOUT';

export const setToken = (token: string | null) => ({
  type: SET_TOKEN as typeof SET_TOKEN,
  payload: token,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN as typeof CLEAR_TOKEN,
});

export const logout = () => ({
  type: LOGOUT as typeof LOGOUT,
});
