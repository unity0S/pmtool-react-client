import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setJwtToken from "../securityUtils/setJwtToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = (LoginRequest, history) => async dispatch => {
  try {
    // post => Login request
    const res = await axios.post("api/users/login", LoginRequest);
    // Extract token from response
    const { token } = res.data;
    // store token in localStorage
    localStorage.setItem("jwtToken", token);
    // set token in header ***
    setJwtToken(token);
    // decode token
    const decoded = jwt_decode(token);
    // dispatch to securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};