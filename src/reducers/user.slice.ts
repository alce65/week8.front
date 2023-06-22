import { createSlice } from '@reduxjs/toolkit';

type UserStates = 'idle' | 'logging' | 'logged';

export type UserLogged = {
  id: string;
  userName: string;
  email: string;
};

type State = {
  userState: UserStates;
  token: string;
  userData: UserLogged | null;
};

const initialState: State = {
  userState: 'idle',
  token: '',
  userData: null,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout: () => {
      return initialState;
    },
    login: (_state: State, { payload }) => ({
      token: payload.token,
      userState: 'logged',
      userData: payload.userData,
    }),
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
