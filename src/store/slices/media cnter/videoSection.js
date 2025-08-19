import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getVideoSection = createAsyncThunk(
    "home/getVideoSection", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("media_center/videos/sections")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const videoSection = createSlice({
    name: "videoSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideoSection.pending, (state) => {
            state.error = null
        })
        builder.addCase(getVideoSection.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getVideoSection.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default videoSection.reducer
