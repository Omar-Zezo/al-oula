import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getViewPhotos = createAsyncThunk(
    "home/getViewPhotos", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/media_center/photos/sections/${id}?limit=0`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const viewPhotos = createSlice({
    name: "viewPhotos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getViewPhotos.pending, (state) => {
            state.error = null
        })
        builder.addCase(getViewPhotos.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getViewPhotos.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default viewPhotos.reducer
