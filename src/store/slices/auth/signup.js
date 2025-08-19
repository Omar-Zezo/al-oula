import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const signupUser = createAsyncThunk(
    "auth/signup", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post("/api/v1/auth/signup", data)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const signup = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.error = null
        })
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default signup.reducer
