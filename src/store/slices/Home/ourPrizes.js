import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getOurPrizes = createAsyncThunk(
    "home/getOurPrizes", 
    async (str, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/home/awards?limit=10`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const ourPrizes = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOurPrizes.pending, (state) => {
            state.error = null
        })
        builder.addCase(getOurPrizes.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getOurPrizes.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default ourPrizes.reducer
