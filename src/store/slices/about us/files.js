import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFiles = createAsyncThunk(
    "home/getFiles", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/files")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const files = createSlice({
    name: "files",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFiles.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFiles.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFiles.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default files.reducer
