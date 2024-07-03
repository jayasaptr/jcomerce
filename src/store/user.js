const DEFAULT_STATE = {
  username: "",
  email: "",
  id: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const dupState = { ...state };

    dupState.username = action.payload.username;
    dupState.email = action.payload.email;
    dupState.id = action.payload.id;

    return dupState;
  }

  return state;
};
