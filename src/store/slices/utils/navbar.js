import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getNavbarLinks = createAsyncThunk(
    "home/getNavbarLinks", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/navbar_items")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const navbar = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNavbarLinks.pending, (state) => {
            state.error = null
        })
        builder.addCase(getNavbarLinks.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getNavbarLinks.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default navbar.reducer
