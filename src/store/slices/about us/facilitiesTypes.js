import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFacilitiesTypes = createAsyncThunk(
    "home/getFacilitiesTypes", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/facilities/types/only")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const facilitiesTypes = createSlice({
    name: "facilitiesTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFacilitiesTypes.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFacilitiesTypes.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFacilitiesTypes.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default facilitiesTypes.reducer
