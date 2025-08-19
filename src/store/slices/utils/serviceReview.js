import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const makeServiceReview = createAsyncThunk(
    "home/makeServiceReview", 
    async ({data, id}, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.post(`/review/${id}`, data, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const serviceReview = createSlice({
    name: "serviceReview",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeServiceReview.pending, (state) => {
            state.error = null
        })
        builder.addCase(makeServiceReview.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(makeServiceReview.rejected, (state, action) => {
            state.data = null
            state.error = action.payload.response
        })
    }
})

export default serviceReview.reducer
