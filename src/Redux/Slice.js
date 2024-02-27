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

export const removeFromCart = createAsyncThunk('product/removeFromCart', async (productId) => {
     try {
          await axios.delete(`${Carturl} / ${productId}`);
          return productId;
     } catch (error) {
          console.log(error);
          throw error;
     }
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

export const addToCart = createAsyncThunk('product/addToCart', async (productData) => {
     try {
          const response = await axios.post(Carturl, productData);
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
               })
               .addCase(removeFromCart.fulfilled, (state, action) => {
                    state.product = state.product.filter(item => item.id !== action.payload);
               })
               .addCase(addToCart.fulfilled, (state, action) => {
                    state.product = action.payload;
               });
     },
});

export default Slice.reducer;
