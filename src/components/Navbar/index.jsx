import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsyncThunk } from "../../redux/todoSlice";
import { Wrapper } from "./style";

function Navbar() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  return (
    <Wrapper>
      <Wrapper.Form>
        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button
          onClick={() => {
            dispatch(
              addTodoAsyncThunk({
                id: new Date().getMilliseconds(),
                completed: false,
                title: todo,
              })
            );
            setTodo("");
          }}
        >
          Add
        </button>
      </Wrapper.Form>
    </Wrapper>
  );
}

export default Navbar;
