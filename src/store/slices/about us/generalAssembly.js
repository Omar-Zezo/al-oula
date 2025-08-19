import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getGeneralAssembly = createAsyncThunk(
    "home/getGeneralAssembly", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            return await baseUrl.get("/list-of-members-of-the-general-assembly")
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const generalAssembly = createSlice({
    name: "generalAssembly",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGeneralAssembly.pending, (state) => {
            state.error = null
        })
        builder.addCase(getGeneralAssembly.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getGeneralAssembly.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default generalAssembly.reducer
