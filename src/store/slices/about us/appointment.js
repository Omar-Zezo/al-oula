import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const makeAppointment = createAsyncThunk(
    "home/makeAppointment", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post("/facilities/make_appointment", data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const appointment = createSlice({
    name: "appointment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeAppointment.pending, (state) => {
            state.error = null
        })
        builder.addCase(makeAppointment.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(makeAppointment.rejected, (state, action) => {
            state.data = null
            state.error = action.payload.response
        })
    }
})

export default appointment.reducer
