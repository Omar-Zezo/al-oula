import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getGiftsCategories = createAsyncThunk(
    "home/getGiftsCategories", 
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.get(`/gifts/gift-categories`, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const giftsCategories = createSlice({
    name: "giftsCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGiftsCategories.pending, (state) => {
            state.error = null
        })
        builder.addCase(getGiftsCategories.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getGiftsCategories.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default giftsCategories.reducer
