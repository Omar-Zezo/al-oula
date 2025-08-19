import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getGovernanceMaterialDetails = createAsyncThunk(
    "home/getGovernanceMaterialDetails", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get(`/about-the-association/governance-material-sections/${id}`)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const governanceMaterialDetails = createSlice({
    name: "governanceMaterialDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGovernanceMaterialDetails.pending, (state) => {
            state.error = null
        })
        builder.addCase(getGovernanceMaterialDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getGovernanceMaterialDetails.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default governanceMaterialDetails.reducer
