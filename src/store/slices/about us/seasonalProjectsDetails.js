import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getSeasonalProjectsDetails = createAsyncThunk(
    "home/getSeasonalProjectsDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/programs-sections/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const seasonalProjectsDetails = createSlice({
    name: "seasonalProjectsDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSeasonalProjectsDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getSeasonalProjectsDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getSeasonalProjectsDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default seasonalProjectsDetails.reducer
