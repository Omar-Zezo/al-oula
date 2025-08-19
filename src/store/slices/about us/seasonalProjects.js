import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getSeasonalProjects = createAsyncThunk(
    "home/getSeasonalProjects", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/programs-sections")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const seasonalProjects = createSlice({
    name: "seasonalProjects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSeasonalProjects.pending, (state) => {
            state.error = null
        })
        builder.addCase(getSeasonalProjects.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getSeasonalProjects.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default seasonalProjects.reducer
