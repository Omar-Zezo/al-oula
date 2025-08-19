import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const makeGiftOrderInService = createAsyncThunk(
    "home/makeGiftOrderInService", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.post("/make_gift_service_order", data, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const giftOrderInService = createSlice({
    name: "giftOrderInService",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeGiftOrderInService.pending, (state) => {
            state.error = null
        })
        builder.addCase(makeGiftOrderInService.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(makeGiftOrderInService.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default giftOrderInService.reducer
