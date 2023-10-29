import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReservation } from "../api/reservationAPI";

const initialState = {
  event: [],
  status: "idle",
  error: null,
  shouldFetchLatestEvents: false,
};

export const getApiEvent = createAsyncThunk(
  "event/getApiEvent",
  getReservation.getEvent
);

export const postApiEvent = createAsyncThunk(
  "event/postApiEvent",
  getReservation.postEvent
);

export const deleteApiEvent = createAsyncThunk(
  "event/deleteApiEvent",
  getReservation.deleteEvent
);

export const editApiEvent = createAsyncThunk(
  "event/editApiEvent",
  async (data) => {
    const response = await getReservation.editEvent(data.id, data);
    return response.data;
  }
);

export const registerSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    toggleShouldFetchLatestEvents: (state) => {
      state.shouldFetchLatestEvents = !state.shouldFetchLatestEvents;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getApiEvent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.event = action.payload;
    });
    builder.addCase(getApiEvent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(postApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postApiEvent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.event = [...state.event, action.payload];
    });
    builder.addCase(postApiEvent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(deleteApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteApiEvent.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteApiEvent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(editApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editApiEvent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.event = action.payload;
    });
    builder.addCase(editApiEvent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { toggleShouldFetchLatestEvents } = registerSlice.actions;

export default registerSlice.reducer;
