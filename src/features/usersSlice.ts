import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    loading: false,
    loaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => ({
        ...state,
        loading: true,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loading: false,
        loaded: true,
      }))
      .addCase(fetchUsers.rejected, state => ({
        ...state,
        loading: false,
        loaded: true,
        hasError: true,
      }));
  },
});

export default usersSlice.reducer;
