import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getStatistics = createAsyncThunk(
    "home/getStatistics", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/home/counters_section")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const statistics = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatistics.pending, (state) => {
            state.error = null
        })
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getStatistics.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default statistics.reducer
