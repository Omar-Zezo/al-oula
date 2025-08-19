import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getVolunteeringTimes = createAsyncThunk(
    "home/getVolunteeringTimes", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/volunteering_times")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const volunteeringTimes = createSlice({
    name: "volunteeringTimes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVolunteeringTimes.pending, (state) => {
            state.error = null
        })
        builder.addCase(getVolunteeringTimes.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getVolunteeringTimes.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default volunteeringTimes.reducer
