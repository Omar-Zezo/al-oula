import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getGiftsCards = createAsyncThunk(
    "home/getGiftsCards", 
    async (id, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            return await baseUrl.get(`/gifts/gift-cards-of-category/${id}`, config)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const giftsCards = createSlice({
    name: "giftsCards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGiftsCards.pending, (state) => {
            state.error = null
        })
        builder.addCase(getGiftsCards.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getGiftsCards.rejected, (state, action) => {
            state.data = null
            state.error = action.payload
        })
    }
})

export default giftsCards.reducer
