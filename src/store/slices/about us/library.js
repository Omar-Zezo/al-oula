import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getLibrary = createAsyncThunk(
    "home/getLibrary", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/library`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const library = createSlice({
    name: "library",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLibrary.pending, (state) => {
            state.error = null
        })
        builder.addCase(getLibrary.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getLibrary.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default library.reducer
