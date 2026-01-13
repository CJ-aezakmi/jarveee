import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  type: string;
  status: string;
  priority: string;
  accountId: string;
  campaignId?: string;
  createdAt: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  statistics: {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  };
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  statistics: {
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    setStatistics: (state, action: PayloadAction<typeof initialState.statistics>) => {
      state.statistics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTasks, setStatistics, setLoading } = tasksSlice.actions;
export default tasksSlice.reducer;
