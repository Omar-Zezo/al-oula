import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getInitiativesList = createAsyncThunk(
    "home/getInitiativesList", 
    async (str, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/initiatives?${str}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const initiatives = createSlice({
    name: "initiatives",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitiativesList.pending, (state) => {
            state.error = null
        })
        builder.addCase(getInitiativesList.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getInitiativesList.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default initiatives.reducer
