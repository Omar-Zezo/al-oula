import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getPhotoSection = createAsyncThunk(
    "home/getPhotoSection", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/media_center/photos/sections")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const photoSection = createSlice({
    name: "photoSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPhotoSection.pending, (state) => {
            state.error = null
        })
        builder.addCase(getPhotoSection.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getPhotoSection.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default photoSection.reducer
