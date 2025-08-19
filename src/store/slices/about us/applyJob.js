import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const applyForJob = createAsyncThunk(
    "home/applyForJob", 
    async (formData, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post("/employment-application", formData)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const applyJob = createSlice({
    name: "applyJob",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(applyForJob.pending, (state) => {
            state.error = null
        })
        builder.addCase(applyForJob.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(applyForJob.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default applyJob.reducer
