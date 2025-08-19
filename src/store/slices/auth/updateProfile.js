import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const updateUser = createAsyncThunk(
    "auth/updateUser", 
    async (data, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.post("/profile", data, config)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const updateProfile = createSlice({
    name: "updateProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateUser.pending, (state) => {
            state.error = null
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default updateProfile.reducer
