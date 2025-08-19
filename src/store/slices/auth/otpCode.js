import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getOtpCode = createAsyncThunk(
    "auth/otpCode", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const res = await baseUrl.post("/phone-verification-code", data)
            return res
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const otpCode = createSlice({
    name: "otpCode",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOtpCode.pending, (state) => {
            state.error = null
        })
        builder.addCase(getOtpCode.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getOtpCode.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default otpCode.reducer
