import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getMsgTypes = createAsyncThunk(
    "home/getMsgTypes", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/contact-us/types")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const msgTypes = createSlice({
    name: "msgTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMsgTypes.pending, (state) => {
            state.error = null
        })
        builder.addCase(getMsgTypes.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getMsgTypes.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default msgTypes.reducer
