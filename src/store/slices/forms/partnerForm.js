import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const partnerJoin = createAsyncThunk(
    "home/partnerJoin", 
    async (formData, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const config = {headers: {"Content-Type": "multipart/form-data"}}
            return await baseUrl.post(`/partner-form`, formData, config)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const partnerForm = createSlice({
    name: "partnerForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(partnerJoin.pending, (state) => {
            state.error = null
        })
        builder.addCase(partnerJoin.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(partnerJoin.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default partnerForm.reducer
