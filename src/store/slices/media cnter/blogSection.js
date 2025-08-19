import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getBlogSection = createAsyncThunk(
    "home/getBlogSection", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/media_center/blogs/sections")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const blogSection = createSlice({
    name: "blogSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogSection.pending, (state) => {
            state.error = null
        })
        builder.addCase(getBlogSection.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getBlogSection.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default blogSection.reducer
