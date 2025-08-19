import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getOurTeam = createAsyncThunk(
    "home/getOurTeam", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/about-the-association/our-team")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const ourTeam = createSlice({
    name: "ourTeam",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOurTeam.pending, (state) => {
            state.error = null
        })
        builder.addCase(getOurTeam.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getOurTeam.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default ourTeam.reducer
