import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getBlogDetails = createAsyncThunk(
    "home/getBlogDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/media_center/blogs/${id}/show`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const blogDetails = createSlice({
    name: "newsDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getBlogDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getBlogDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default blogDetails.reducer
