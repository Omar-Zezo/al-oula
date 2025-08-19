import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getFaqList = createAsyncThunk(
    "home/getFaqList", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/faqs")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const faqList = createSlice({
    name: "faqList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFaqList.pending, (state) => {
            state.error = null
        })
        builder.addCase(getFaqList.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getFaqList.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default faqList.reducer
