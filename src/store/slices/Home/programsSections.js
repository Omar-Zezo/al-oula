import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getProgramsSections = createAsyncThunk(
    "home/getProgramsSections", 
    async (str, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/home/programs_sections?${str}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const programsSections = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProgramsSections.pending, (state) => {
            state.error = null
        })
        builder.addCase(getProgramsSections.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getProgramsSections.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default programsSections.reducer
