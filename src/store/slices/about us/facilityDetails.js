import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFacilitieDetails = createAsyncThunk(
    "home/getFacilitieDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/facilities/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const facilityDetails = createSlice({
    name: "facilityDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFacilitieDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFacilitieDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFacilitieDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default facilityDetails.reducer
