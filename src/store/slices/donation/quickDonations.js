import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getQuickDonations = createAsyncThunk(
    "home/getQuickDonations", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/home/quick_services?order_by=random&limit=4`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const quickDonations = createSlice({
    name: "quickDonations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuickDonations.pending, (state) => {
            state.error = null
        })
        builder.addCase(getQuickDonations.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getQuickDonations.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default quickDonations.reducer
