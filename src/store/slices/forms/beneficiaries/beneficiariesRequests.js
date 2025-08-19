import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getBeneficiariesRequests = createAsyncThunk(
    "home/getBeneficiariesRequests", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/beneficiaries-requests")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const beneficiariesRequests = createSlice({
    name: "beneficiariesRequests",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBeneficiariesRequests.pending, (state) => {
            state.error = null
        })
        builder.addCase(getBeneficiariesRequests.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getBeneficiariesRequests.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default beneficiariesRequests.reducer
