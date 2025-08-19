import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getInitiativeDetails = createAsyncThunk(
    "home/getInitiativeDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/initiatives/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const initiativeDetails = createSlice({
    name: "initiativeDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitiativeDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getInitiativeDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getInitiativeDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default initiativeDetails.reducer
