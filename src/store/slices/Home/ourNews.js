import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getOurNews = createAsyncThunk(
    "home/getOurNews", 
    async (str, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/home/news?${str}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const ourNews = createSlice({
    name: "ourNews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOurNews.pending, (state) => {
            state.error = null
        })
        builder.addCase(getOurNews.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getOurNews.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default ourNews.reducer
