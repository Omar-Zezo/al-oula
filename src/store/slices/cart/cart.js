import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getUserCart = createAsyncThunk(
    "profile/getUserCart", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.get("/cart", config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserCart.pending, (state) => {
            state.error = null
        })
        builder.addCase(getUserCart.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getUserCart.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default cart.reducer
