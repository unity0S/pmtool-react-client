import { SET_CURRENT_USER } from "../actions/types";

const initalState = {
  user: {
    username: "",
    password: ""
  },
  validToken: false
};

const booleanActionPayload = payload => {
  if(payload) {
    return true;
  }
  return false;
};

export default function(state= initalState, action) {
  switch(action.type) {
    case SET_CURRENT_USER: 
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
};