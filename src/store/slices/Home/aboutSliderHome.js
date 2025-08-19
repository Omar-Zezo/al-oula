import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getAboutSliderHome = createAsyncThunk(
    "home/getAboutSliderHome", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/sliders/about_us")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const aboutSliderHome = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAboutSliderHome.pending, (state) => {
            state.error = null
        })
        builder.addCase(getAboutSliderHome.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getAboutSliderHome.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default aboutSliderHome.reducer
