const DEFAULT_STATE = {
  username: "",
  email: "",
  id: "",
  role: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const dupState = { ...state };

    dupState.username = action.payload.username;
    dupState.email = action.payload.email;
    dupState.id = action.payload.id;
    dupState.role = action.payload.role;

    return dupState;
  } else if (action.type === "USER_LOGOUT") {
    return DEFAULT_STATE;
  }

  return state;
};
