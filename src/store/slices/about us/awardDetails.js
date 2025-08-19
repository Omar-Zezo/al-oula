import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getAwardDetails = createAsyncThunk(
    "home/getAwardDetails", 
    async (slug, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/awards/d/${slug}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const awardDetails = createSlice({
    name: "awardDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAwardDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getAwardDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getAwardDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default awardDetails.reducer
