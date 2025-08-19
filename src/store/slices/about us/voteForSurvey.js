import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const makeVoting = createAsyncThunk(
    "home/makeVoting", 
    async ({data, id}, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post(`/survey/vote/${id}`, data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const voteForSurvey = createSlice({
    name: "surveys",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeVoting.pending, (state) => {
            state.error = null
        })
        builder.addCase(makeVoting.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(makeVoting.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default voteForSurvey.reducer
