// src/redux/reducers/authReducer.js
import { Reducer } from 'redux';
import { SET_TOKEN, CLEAR_TOKEN, LOGOUT } from './authActions';

// Check if a token exists in localStorage during initialization
const initialToken = localStorage.getItem('accessToken');

const initialState = {
  token: initialToken || null,
};

const authReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case CLEAR_TOKEN:
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
};

export default authReducer;
