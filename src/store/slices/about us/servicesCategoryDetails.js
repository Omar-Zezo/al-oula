import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getServicesCategoryDetails = createAsyncThunk(
    "home/getServicesCategoryDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/services-sections/${id}/services`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const servicesCategoryDetails = createSlice({
    name: "servicesCategoryDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServicesCategoryDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getServicesCategoryDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getServicesCategoryDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default servicesCategoryDetails.reducer
