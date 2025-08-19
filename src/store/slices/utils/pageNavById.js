import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getPageNavById = createAsyncThunk(
    "home/getPageNavById", 
    async (key, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/pages/key/${key}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const pageNavById = createSlice({
    name: "pageNavById",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPageNavById.pending, (state) => {
            state.error = null
        })
        builder.addCase(getPageNavById.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getPageNavById.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default pageNavById.reducer
