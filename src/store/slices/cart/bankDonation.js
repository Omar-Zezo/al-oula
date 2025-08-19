import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const bankDonationPay = createAsyncThunk(
    "cart/bankDonationPay", 
    async ({formData, donationCode}, thunkApi) => {
        console.log(formData)
        const { rejectWithValue } = thunkApi
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "multipart/form-data"
                }
              };
            const res = await baseUrl.post(`/bank_transfer/${donationCode}`, formData, config)
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

const bankDonation = createSlice({
    name: "bankDonation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(bankDonationPay.pending, (state) => {
            state.error = null
        })
        builder.addCase(bankDonationPay.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(bankDonationPay.rejected, (state, action) => {
            state.data = null
            state.error = action.payload.response
        })
    }
})

export default bankDonation.reducer
