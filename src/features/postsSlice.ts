import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [] as Post[],
    loaded: false,
    hasError: false,
  },
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })

      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
