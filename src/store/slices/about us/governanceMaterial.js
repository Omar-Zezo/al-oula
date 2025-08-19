import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getGovernanceMaterial = createAsyncThunk(
    "home/getGovernanceMaterial", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/about-the-association/governance-material-sections")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const governanceMaterial = createSlice({
    name: "governanceMaterial",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGovernanceMaterial.pending, (state) => {
            state.error = null
        })
        builder.addCase(getGovernanceMaterial.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getGovernanceMaterial.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default governanceMaterial.reducer
