import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalServices";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create goal
export const CreateGoal = createAsyncThunk(
  "goal/create",
  async (goal, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await goalService.createGoal(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//get all goals
export const GetGoals = createAsyncThunk("goal/all", async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.error ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

//update goal
export const UpdateGoal = createAsyncThunk(
  "goal/update",
  async (goal, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await goalService.updateGoal(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//delete goal
export const DeleteGoal = createAsyncThunk(
  "goal/delete",
  async (goal, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await goalService.deleteGoal(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload.newGoal);
      })
      .addCase(CreateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.goals = null;
      })
      .addCase(GetGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload.goals;
      })
      .addCase(GetGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.goals = null;
      })
      .addCase(UpdateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const updatedGoal = action.payload.updatedGoal;
        const goalIndex = state.goals.findIndex(
          (goal) => goal._id === updatedGoal._id
        );

        if (goalIndex !== -1) {
          state.goals[goalIndex] = updatedGoal;
        }
      })
      .addCase(UpdateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.goals = null;
      })
      .addCase(DeleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const deletedGoalId = action.payload.id;
        state.goals = state.goals.filter((goal) => goal._id !== deletedGoalId);
      })
      .addCase(DeleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.goals = null;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
