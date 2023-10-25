import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReservation } from "../api/reservationAPI";

const initialState = {
  message: [],
  error: null,
  idle: "",
};

export const getApiEvent = createAsyncThunk(
  "products/fetchApiProduct",
  getReservation.getPost
);

export const postApiEvent = createAsyncThunk(
  "products/postApiProduct",
  getReservation.addEvent
);

export const deleteApiEvent = createAsyncThunk(
  "product/deleteApiProduct",
  getReservation.deleteEvent
);

export const editApiEvent = createAsyncThunk(
  "product/editApiProduct:id",
  async (data) => {
    const response = await getReservation.editEvent(data.id, data);
    return response.data;
  }
);

export const registerSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getApiEvent.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.event = payload;
    });
    builder.addCase(getApiEvent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(postApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postApiEvent.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.event = [...state.event, payload];
    });
    builder.addCase(postApiEvent.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error.message;
    });
    builder.addCase(deleteApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteApiEvent.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.event = payload;
    });
    builder.addCase(deleteApiEvent.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error.message;
    });
    builder.addCase(editApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editApiEvent.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.event = payload;
    });
    builder.addCase(editApiEvent.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload.error.message;
    });
  },
});

export default registerSlice.reducer;
