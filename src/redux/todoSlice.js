import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getTodoAsyncThunk = createAsyncThunk(
  "todo/getTodoAsyncThunk",
  async () => {
    const resp = await fetch(`${BASE_URL}/todos/`);
    const data = await resp.json();
    return data;
  }
);

export const delTodoAsyncThunk = createAsyncThunk(
  "todo/delTodoAsyncThunk",
  async ({ id }, { dispatch }) => {
    const resp = await fetch(`${BASE_URL}/todos${id}`, {
      method: "DELETE",
      headers: { "Content-type": "aplication/json" },
    });
    dispatch(onDelete({ id }));
    const data = await resp.json();
    return data;
  }
);

export const addTodoAsyncThunk = createAsyncThunk(
  "todo/addTodoAsyncThunk",
  async (addData, { dispatch }) => {
    const resp = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      body: addData,
      headers: { "content-type": "aplication/json" },
    });
    dispatch(addTodo(addData));
    const data = await resp.json();
    return data;
  }
);

export const updateTodoAsyncThunk = createAsyncThunk(
  "todo/updateTodoAsyncThunk",
  async (updateData, { dispatch }) => {
    const resp = await fetch(`${BASE_URL}/todos/${updateData.id}`, {
      method: "PUT",
      headers: { "Content-type": "aplication/json" },
      body: updateData,
    });
    dispatch(onSave(updateData));
    const data = await resp.json();
    return data;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isEdit: false,
    editingTodo: {},
    isError: false,
    isLoading: false,
  },
  reducers: {
    addTodo(state, action) {
      state.todos = [...state.todos, { ...action.payload }];
    },
    onToggle(state, action) {
      state.todos = state.todos.map((value) =>
        value.id === action.payload.id
          ? { ...value, completed: !value.completed }
          : value
      );
    },
    onEdit(state, action) {
      state.isEdit = true;
      state.editingTodo = action.payload;
    },
    onSave(state, action) {
      state.todos = state.todos.map((value) =>
        value.id === action.payload.id ? { ...action.payload } : value
      );
      state.isEdit = false;
      state.editingTodo = {};
    },
    onDelete(state, action) {
      state.todos = state.todos.filter(
        (value) => value.id !== action.payload.id
      );
    },
  },

  extraReducers: {
    [getTodoAsyncThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodoAsyncThunk.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    [getTodoAsyncThunk.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [delTodoAsyncThunk.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [delTodoAsyncThunk.fulfilled]: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    [delTodoAsyncThunk.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [addTodoAsyncThunk.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [addTodoAsyncThunk.fulfilled]: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    [addTodoAsyncThunk.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [updateTodoAsyncThunk.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [updateTodoAsyncThunk.fulfilled]: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    [updateTodoAsyncThunk.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { addTodo, onToggle, onEdit, onSave, onDelete } =
  todoSlice.actions;

export default todoSlice.reducer;
