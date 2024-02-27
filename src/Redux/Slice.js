import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Carturl } from '../Config/Urls';

const initialState = {
     product: [],
     loading: false,
     error: null,
};

export const fetchUserData = createAsyncThunk('product/fetchUserData', async () => {
     return (await axios.get(Carturl).then((res) => {
          return res.data
     }).catch((err) => {
          console.log(err);
     }),
          await axios.delete(`${Carturl}/${800}`).then((responce) => {
               return axios.get(Carturl).then((responce) => {
                    return responce.data
               }).catch((err) => {
                    console.log(err);
               });
          }).catch((err) => {

               console.log(err);
          })
     )

});

export const updateQuantity = createAsyncThunk('product/updateQuantity', async ({ productId, quantity }) => {
     try {
          const response = await axios.patch(`${Carturl}/${productId}`, { quantity });
          return response.data;
     } catch (error) {
          console.log(error);
          throw error;
     }
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
               })
               .addCase(updateQuantity.fulfilled, (state, action) => {
                    const updatedProductIndex = state.product.findIndex(product => product.id === action.payload.id);
                    if (updatedProductIndex !== -1) {
                         state.product[updatedProductIndex].quantity = action.payload.quantity;
                    }
               });
     },
});

export default Slice.reducer;
