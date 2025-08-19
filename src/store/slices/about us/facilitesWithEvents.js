import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFacilitesWithEvents = createAsyncThunk(
    "home/getFacilitesWithEvents", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/facilities/types/${id}/events`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const facilitesWithEvents = createSlice({
    name: "facilitesWithEvents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFacilitesWithEvents.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFacilitesWithEvents.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFacilitesWithEvents.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default facilitesWithEvents.reducer
