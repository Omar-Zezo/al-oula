import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getOurBlogs = createAsyncThunk(
    "home/getOurBlogs", 
    async (str, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/home/blogs?${str}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const ourBlogs = createSlice({
    name: "ourBlogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOurBlogs.pending, (state) => {
            state.error = null
        })
        builder.addCase(getOurBlogs.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getOurBlogs.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default ourBlogs.reducer
