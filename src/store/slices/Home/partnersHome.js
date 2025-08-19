import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getPartnersHome = createAsyncThunk(
    "home/getPartnersHome", 
    async (str, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/home/partners?${str}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const partnersHome = createSlice({
    name: "partnersHome",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPartnersHome.pending, (state) => {
            state.error = null
        })
        builder.addCase(getPartnersHome.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getPartnersHome.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default partnersHome.reducer
