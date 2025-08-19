import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFacilities = createAsyncThunk(
    "home/getFacilities", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/facilities")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const facilities = createSlice({
    name: "facilities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFacilities.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFacilities.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFacilities.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default facilities.reducer
