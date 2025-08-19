import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getServiceDetails = createAsyncThunk(
    "home/getServiceDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`services/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const serviceDetails = createSlice({
    name: "serviceDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServiceDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getServiceDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getServiceDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default serviceDetails.reducer
