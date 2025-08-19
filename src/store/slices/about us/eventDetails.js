import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getEventDetails = createAsyncThunk(
    "home/getEventDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/about-the-association/events/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const eventDetails = createSlice({
    name: "eventDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEventDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getEventDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getEventDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default eventDetails.reducer
