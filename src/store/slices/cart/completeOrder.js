import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getCompleteCode = createAsyncThunk(
    "profile/getCompleteCode", 
    async ({data, url}, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.post(`${url}`, data, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const completeOrder = createSlice({
    name: "completeOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCompleteCode.pending, (state) => {
            state.error = null
        })
        builder.addCase(getCompleteCode.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getCompleteCode.rejected, (state, action) => {
            state.data = null
            state.error = action.payload.response
        })
    }
})

export default completeOrder.reducer
