import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getNewsSection = createAsyncThunk(
    "home/getNewsSection", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/media_center/news/sections")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const newsSection = createSlice({
    name: "newsSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNewsSection.pending, (state) => {
            state.error = null
        })
        builder.addCase(getNewsSection.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getNewsSection.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default newsSection.reducer
