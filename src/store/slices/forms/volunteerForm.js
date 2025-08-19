import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const volunteerJoin = createAsyncThunk(
    "home/volunteerJoin", 
    async (formData, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const config = {headers: {"Content-Type": "multipart/form-data"}}
            return await baseUrl.post(`/volunteer-form`, formData, config)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const volunteerForm = createSlice({
    name: "volunteerForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(volunteerJoin.pending, (state) => {
            state.error = null
        })
        builder.addCase(volunteerJoin.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(volunteerJoin.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default volunteerForm.reducer
