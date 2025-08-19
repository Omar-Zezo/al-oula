import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lang: localStorage.getItem("i18nextLng"),
}

export const langDetect = createSlice({
  name: 'langDetect',
  initialState,
  reducers: {
    langEn: (state) => {
      state.lang = "en"
    },
    langAr: (state) => {
      state.lang = "ar"
    }
  },
})

export const { langEn, langAr } = langDetect.actions

export default langDetect.reducer