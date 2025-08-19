import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getViewVideos = createAsyncThunk(
    "home/getViewVideos", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/videos-sections/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const viewVideos = createSlice({
    name: "viewVideos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getViewVideos.pending, (state) => {
            state.error = null
        })
        builder.addCase(getViewVideos.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getViewVideos.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default viewVideos.reducer
