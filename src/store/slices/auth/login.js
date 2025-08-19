import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const loginUser = createAsyncThunk(
    "auth/login", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.post("/login", data)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const login = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default login.reducer
