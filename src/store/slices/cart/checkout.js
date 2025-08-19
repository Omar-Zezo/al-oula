import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getCheckout = createAsyncThunk(
    "home/getCheckout", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.post("/checkout", data, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const checkout = createSlice({
    name: "checkout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCheckout.pending, (state) => {
            state.error = null
        })
        builder.addCase(getCheckout.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getCheckout.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default checkout.reducer
