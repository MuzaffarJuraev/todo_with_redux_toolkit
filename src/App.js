import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper } from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import { getTodoAsyncThunk } from "./redux/todoSlice";
import { useGetTodoQuery } from "./redux/apiSlice";

function App() {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetTodoQuery();
  console.log("data", data);
  useEffect(() => {
    // dispatch(getTodoAsyncThunk());
  }, []);
  return (
    <Wrapper>
      <Navbar />
      {todo.isLoading ? (
        <p>Loading...</p>
      ) : todo.isError ? (
        <p style={{ color: "red" }}>Something went wrong</p>
      ) : (
        todo.todos.map((value) => <Todo key={value.id} {...value} />)
      )}
    </Wrapper>
  );
}

export default App;
