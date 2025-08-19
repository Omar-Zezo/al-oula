import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getGiftPayment = createAsyncThunk(
    "home/getGiftPayment", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.post("/make_gift_order", data, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const giftPayment = createSlice({
    name: "giftPayment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGiftPayment.pending, (state) => {
            state.error = null
        })
        builder.addCase(getGiftPayment.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getGiftPayment.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default giftPayment.reducer
