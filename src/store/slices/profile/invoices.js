import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getInvoices = createAsyncThunk(
    "profile/getInvoices", 
    async ({str}, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.get(`/my-bills?${str}`, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const invoices = createSlice({
    name: "invoices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInvoices.pending, (state) => {
            state.error = null
        })
        builder.addCase(getInvoices.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getInvoices.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default invoices.reducer
