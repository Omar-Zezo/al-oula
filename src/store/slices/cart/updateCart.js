import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserCart } from "./cart"


export const updateCartQty = createAsyncThunk(
    "cart/updateCartQty", 
    async (data, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            const res = await baseUrl.post("/cart/change-quantity", data, config)
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

const updateCart = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateCartQty.pending, (state) => {
            state.error = null
        })
        builder.addCase(updateCartQty.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(updateCartQty.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default updateCart.reducer
