import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserCart } from "./cart"


export const removeAllCartItems = createAsyncThunk(
    "cart/removeAllCartItems", 
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            const res = await baseUrl.delete(`/destroy-all-cart`, config)
            dispatch(getUserCart())
            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const removeCart = createSlice({
    name: "removeCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(removeAllCartItems.pending, (state) => {
            state.error = null
        })
        builder.addCase(removeAllCartItems.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(removeAllCartItems.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default removeCart.reducer
