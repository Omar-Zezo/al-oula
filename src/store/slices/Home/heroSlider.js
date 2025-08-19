import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getHeroSlider = createAsyncThunk(
    "home/getHeroSlider", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/sliders/home")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const heroSlider = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHeroSlider.pending, (state) => {
            state.error = null
        })
        builder.addCase(getHeroSlider.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getHeroSlider.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default heroSlider.reducer
