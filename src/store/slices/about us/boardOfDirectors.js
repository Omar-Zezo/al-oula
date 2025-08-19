import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getBoardOfDirectors = createAsyncThunk(
    "home/getBoardOfDirectors", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/about-the-association/board-of-directors")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const boardOfDirectors = createSlice({
    name: "boardOfDirectors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBoardOfDirectors.pending, (state) => {
            state.error = null
        })
        builder.addCase(getBoardOfDirectors.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getBoardOfDirectors.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default boardOfDirectors.reducer
