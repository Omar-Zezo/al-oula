import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getAllPrograms = createAsyncThunk(
    "home/getAllPrograms", 
    async ({str}, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/programs?${str}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const allPrograms = createSlice({
    name: "allPrograms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPrograms.pending, (state) => {
            state.error = null
        })
        builder.addCase(getAllPrograms.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getAllPrograms.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default allPrograms.reducer
