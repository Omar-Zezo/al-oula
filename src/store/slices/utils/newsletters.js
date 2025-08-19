import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const makeSubscribe = createAsyncThunk(
    "home/makeSubscribe", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post(`/newsletters/email/store`, data)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const newsletters = createSlice({
    name: "newsletters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeSubscribe.pending, (state) => {
            state.error = null
        })
        builder.addCase(makeSubscribe.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(makeSubscribe.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default newsletters.reducer
