import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getServicesSections = createAsyncThunk(
    "home/getServicesSections", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/services-sections")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const servicesSections = createSlice({
    name: "servicesSections",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServicesSections.pending, (state) => {
            state.error = null
        })
        builder.addCase(getServicesSections.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getServicesSections.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default servicesSections.reducer
