import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFacilitiesTypesFacilities = createAsyncThunk(
    "home/getFacilitiesTypesFacilities", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/facilities/types/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const facilitiesTypesFacilities = createSlice({
    name: "facilitiesTypesFacilities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFacilitiesTypesFacilities.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFacilitiesTypesFacilities.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFacilitiesTypesFacilities.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default facilitiesTypesFacilities.reducer
