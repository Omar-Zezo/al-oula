import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getContactInfo = createAsyncThunk(
    "home/getContactInfo", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/contact-us")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const contactInfo = createSlice({
    name: "contactInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getContactInfo.pending, (state) => {
            state.error = null
        })
        builder.addCase(getContactInfo.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getContactInfo.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default contactInfo.reducer
