import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getBriefHome = createAsyncThunk(
    "home/getBriefHome", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/home/brief")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const briefHome = createSlice({
    name: "heroSlider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBriefHome.pending, (state) => {
            state.error = null
        })
        builder.addCase(getBriefHome.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getBriefHome.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default briefHome.reducer
