import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getStrategies = createAsyncThunk(
    "home/getStrategies", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/strategies")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const strategies = createSlice({
    name: "strategies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStrategies.pending, (state) => {
            state.error = null
        })
        builder.addCase(getStrategies.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getStrategies.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default strategies.reducer
