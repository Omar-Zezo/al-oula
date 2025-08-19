import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFooterLinks = createAsyncThunk(
    "home/getFooterLinks", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/footer_items")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const footer = createSlice({
    name: "footer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFooterLinks.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFooterLinks.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFooterLinks.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default footer.reducer
