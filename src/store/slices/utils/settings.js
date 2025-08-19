import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getSettings = createAsyncThunk(
    "home/getSettings", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/settings")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const settings = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSettings.pending, (state) => {
            state.error = null
        })
        builder.addCase(getSettings.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getSettings.rejected, (state, action) => {
            state.data = null
            state.error = action.payload.response
        })
    }
})

export default settings.reducer
