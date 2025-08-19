import baseUrl from "@/store/baseUrl"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserCart } from "./cart"


export const addItemToCart = createAsyncThunk(
    "cart/addItemToCart", 
    async (data, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi
        try {
            const  config = {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
            const res = await baseUrl.post("/add-to-cart", data, config)
            dispatch(getUserCart())
            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: null,
    error: null
}

const addToCart = createSlice({
    name: "addToCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state) => {
            state.error = null
        })
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(addItemToCart.rejected, (state, action) => {
            state.data = null
            state.error = action.payload.response
        })
    }
})

export default addToCart.reducer
