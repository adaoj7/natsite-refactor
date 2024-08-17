import { UnknownAction } from "@reduxjs/toolkit";

export interface LoginAction {
  type: "LOGIN";
  payload: {
    user: string;
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
  user: "",
  name: "",
  email: "",
  isAdmin: false,
};

const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        // @ts-expect-error - action is of type ActionLogin
        user: action.payload.user,
        // @ts-expect-error - action is of type ActionLogin
        name: action.payload.name,
        // @ts-expect-error - action is of type ActionLogin
        email: action.payload.email,
        // @ts-expect-error - action is of type ActionLogin
        isAdmin: action.payload.isAdmin,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
