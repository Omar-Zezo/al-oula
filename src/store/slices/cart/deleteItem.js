import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserCart } from "./cart"


export const deleteItemFromCart = createAsyncThunk(
    "cart/deleteItemFromCart", 
    async (id, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            const res = await baseUrl.delete(`/destroy-cart/${id}`, config)
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

const deleteItem = createSlice({
    name: "deleteItem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteItemFromCart.pending, (state) => {
            state.error = null
        })
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(deleteItemFromCart.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default deleteItem.reducer
