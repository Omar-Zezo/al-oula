import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getClientOpinions = createAsyncThunk(
    "home/getClientOpinions", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/client-opinions")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const clientOpinions = createSlice({
    name: "clientOpinions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getClientOpinions.pending, (state) => {
            state.error = null
        })
        builder.addCase(getClientOpinions.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getClientOpinions.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default clientOpinions.reducer
