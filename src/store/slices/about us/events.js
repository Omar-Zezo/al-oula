import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getEvents = createAsyncThunk(
    "home/getEvents", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/about-the-association/events")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const events = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state) => {
            state.error = null
        })
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getEvents.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default events.reducer
