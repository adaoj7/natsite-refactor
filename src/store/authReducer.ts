import { UnknownAction } from "@reduxjs/toolkit";

export interface LoginAction {
  type: "LOGIN";
  payload: {
    userId: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

export interface LogoutAction {
  type: "LOGOUT";
}

export type ActionType = LoginAction | LogoutAction | UnknownAction;

const initialState = {
  userId: null,
  name: null,
  email: null,
  isAdmin: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE = "UPDATE";

const authReducer = (state = initialState, action: any) => {
  const { type } = action;
  switch (type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {
        userId: null,
        name: null,
        email: null,
        isAdmin: null,
      };
    case UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
