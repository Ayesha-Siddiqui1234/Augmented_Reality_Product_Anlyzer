// src/store/adminSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { adminStats } from '../data/adminStats'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: adminStats,
    uploadStatus: 'idle',
  },
  reducers: {
    setUploadStatus(state, action) { state.uploadStatus = action.payload },
    updateStats(state, action)     { state.stats = { ...state.stats, ...action.payload } },
  },
})

export const { setUploadStatus, updateStats } = adminSlice.actions
export default adminSlice.reducer
