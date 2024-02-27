import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
     product: [],
     loading: false,
     error: null,
};

export const fetchUserData = createAsyncThunk('product/fetchUserData', async () => {
     return await axios.get("https://dummyjson.com/products").then((res) => {
          return res.data
     }).catch((err) => {
          console.log(err);
          // return Promise.reject(err)
     });


});

const Slice = createSlice({
     name: 'product',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(fetchUserData.pending, (state) => {
                    state.loading = true;
               })
               .addCase(fetchUserData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.product = action.payload;
                    state.error = null;
               })
               .addCase(fetchUserData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
               });
     },
});

export default Slice.reducer;
