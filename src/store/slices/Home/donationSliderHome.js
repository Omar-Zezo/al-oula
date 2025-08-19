import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getDonationSliderHome = createAsyncThunk(
    "home/getDonationSliderHome", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/home/donation_programs?limit=5")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const donationSliderHome = createSlice({
    name: "donationSliderHome",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDonationSliderHome.pending, (state) => {
            state.error = null
        })
        builder.addCase(getDonationSliderHome.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getDonationSliderHome.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default donationSliderHome.reducer
