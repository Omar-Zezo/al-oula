import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getNewsSectionDetails = createAsyncThunk(
    "home/getNewsSectionDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/media_center/news/sections/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const newsSectionDetails = createSlice({
    name: "newsSectionDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNewsSectionDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getNewsSectionDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getNewsSectionDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default newsSectionDetails.reducer
