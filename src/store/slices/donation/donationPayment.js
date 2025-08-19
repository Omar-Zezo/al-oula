import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getDonationPayment = createAsyncThunk(
    "home/getDonationPayment", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const token = localStorage.getItem("token")
            if(token){
                const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
                return await baseUrl.post("/make_donation_order", data, config)
            }else{
            return await baseUrl.post("/make_donation_order", data)
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const donationPayment = createSlice({
    name: "donationPayment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDonationPayment.pending, (state) => {
            state.error = null
        })
        builder.addCase(getDonationPayment.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getDonationPayment.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default donationPayment.reducer
