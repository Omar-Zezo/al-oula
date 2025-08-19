import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const membershipJoin = createAsyncThunk(
    "home/membershipJoin", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post(`/membership/checkout`, data)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const membershipForm = createSlice({
    name: "membershipForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(membershipJoin.pending, (state) => {
            state.error = null
        })
        builder.addCase(membershipJoin.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(membershipJoin.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default membershipForm.reducer
