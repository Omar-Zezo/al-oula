import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const makeUnpaidInvoice = createAsyncThunk(
    "profile/makeUnpaidInvoice", 
    async ({donationCode, data}, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.post(`/make_donation_checkout/${donationCode}`, data, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const unpaidInvoice = createSlice({
    name: "unpaidInvoice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeUnpaidInvoice.pending, (state) => {
            state.error = null
        })
        builder.addCase(makeUnpaidInvoice.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(makeUnpaidInvoice.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default unpaidInvoice.reducer
