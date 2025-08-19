import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getProgramDetails = createAsyncThunk(
    "home/getProgramDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/programs/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const programDetails = createSlice({
    name: "programDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProgramDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getProgramDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getProgramDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default programDetails.reducer
