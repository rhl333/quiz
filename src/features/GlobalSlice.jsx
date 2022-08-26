import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialData = {
  questions: [],
  score: 0,
  totalAttempted: 0,
};

export let fetchQuestions = createAsyncThunk("fetch", async () => {
  let response = await fetch("https://the-trivia-api.com/api/questions?limit=1");
  let data = await response.json();
  return data;
});

export let GlobalSlice = createSlice({
  name: "fetch",
  initialState: initialData,
  reducers: {
    INC_SCORE: (state, action) => {
      state.score += 1;
    },
    ATTEMPTED: (state, action) => {
      state.totalAttempted += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state, action) => {
      state.questions = [];
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.questions = [];
    });
  },
});

export default GlobalSlice.reducer;
export const { INC_SCORE, ATTEMPTED } = GlobalSlice.actions;
