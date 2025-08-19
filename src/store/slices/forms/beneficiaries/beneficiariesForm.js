import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const beneficiariesJoin = createAsyncThunk(
    "home/beneficiariesJoin", 
    async (formData, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const config = {headers: {"Content-Type": "multipart/form-data"}}
            return await baseUrl.post(`/beneficiaries-requests`, formData, config)
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const beneficiariesForm = createSlice({
    name: "beneficiariesForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(beneficiariesJoin.pending, (state) => {
            state.error = null
        })
        builder.addCase(beneficiariesJoin.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(beneficiariesJoin.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default beneficiariesForm.reducer
