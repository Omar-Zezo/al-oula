import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getBanksList = createAsyncThunk(
    "profile/getBanksList", 
    async (donationCode, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/banks_accounts`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const banks = createSlice({
    name: "banks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBanksList.pending, (state) => {
            state.error = null
        })
        builder.addCase(getBanksList.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getBanksList.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default banks.reducer
