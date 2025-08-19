import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getInvoiceDetails = createAsyncThunk(
    "home/getInvoiceDetails", 
    async (donationCode, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/donation-invoice/${donationCode}/show`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const invoiceDetails = createSlice({
    name: "invoiceDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInvoiceDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getInvoiceDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getInvoiceDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default invoiceDetails.reducer
