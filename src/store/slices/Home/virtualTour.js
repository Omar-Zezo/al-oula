import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getVirtualTour = createAsyncThunk(
    "home/getVirtualTour", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/virtual_tour")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const virtualTour = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVirtualTour.pending, (state) => {
            state.error = null
        })
        builder.addCase(getVirtualTour.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getVirtualTour.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default virtualTour.reducer
