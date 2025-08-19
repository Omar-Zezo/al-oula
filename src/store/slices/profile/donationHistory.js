import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getDonationHistory = createAsyncThunk(
    "profile/getDonationHistory", 
    async ({str}, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.get(`/donations?${str}&paginate=9`, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const donationHistory = createSlice({
    name: "donationHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDonationHistory.pending, (state) => {
            state.error = null
        })
        builder.addCase(getDonationHistory.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getDonationHistory.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default donationHistory.reducer
