import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getLoggedUser = createAsyncThunk(
    "categories/getLoggedUser", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.get("/profile", config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const loggedUser = createSlice({
    name: "loggedUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLoggedUser.pending, (state) => {
            state.error = null
        })
        builder.addCase(getLoggedUser.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getLoggedUser.rejected, (state, action) => {
            state.data = null
            state.error = action.payload.response
        })
    }
})

export default loggedUser.reducer
