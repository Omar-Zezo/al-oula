import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getJobs = createAsyncThunk(
    "home/getJobs", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/employment-application")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const jobs = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobs.pending, (state) => {
            state.error = null
        })
        builder.addCase(getJobs.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getJobs.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default jobs.reducer
