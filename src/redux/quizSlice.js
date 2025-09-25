import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const fetchQuizQuestions = createAsyncThunk(
  "quiz/fetchQuizQuestions",
  async () => {
    const response = await fetch(`${api()}/quiz-questions`);
    if (!response.ok)
      throw new Error("Något gick fel vid hämtning av quizfrågor");
    return await response.json();
  }
);

const initialState = {
  questions: [],
  currentQuestion: 0,
  score: 0,
  answers: [],
  isFinished: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    answerQuestion(state, action) {
      state.answers.push(action.payload);
      if (action.payload.isCorrect) {
        state.score += 1;
      }
      if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion += 1;
      } else {
        state.isFinished = true;
      }
    },
    resetQuiz(state) {
      state.currentQuestion = 0;
      state.score = 0;
      state.answers = [];
      state.isFinished = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
        state.currentQuestion = 0;
        state.score = 0;
        state.answers = [];
        state.isFinished = false;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { answerQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
