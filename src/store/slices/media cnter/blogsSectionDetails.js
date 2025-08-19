import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getBlogsSectionDetails = createAsyncThunk(
    "home/getBlogsSectionDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/media_center/blogs/sections/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const blogsSectionDetails = createSlice({
    name: "blogsSectionDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogsSectionDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getBlogsSectionDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getBlogsSectionDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default blogsSectionDetails.reducer
