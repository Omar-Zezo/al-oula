import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getNewsDetails = createAsyncThunk(
    "home/getNewsDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/media_center/news/${id}/show`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const newsDetails = createSlice({
    name: "newsDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNewsDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getNewsDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getNewsDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default newsDetails.reducer
