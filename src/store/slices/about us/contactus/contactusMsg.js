import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const makeContactusMsg = createAsyncThunk(
    "home/makeContactusMsg", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post("/contact-us", data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const contactusMsg = createSlice({
    name: "contactusMsg",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeContactusMsg.pending, (state) => {
            state.error = null
        })
        builder.addCase(makeContactusMsg.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(makeContactusMsg.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default contactusMsg.reducer
