import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onToggle, onEdit, updateTodoAsyncThunk } from "../../redux/todoSlice";
import { delTodoAsyncThunk } from "../../redux/todoSlice";

import { Wrapper } from "./style";

function Todo({ id, title, completed }) {
  const { editingTodo, isEdit } = useSelector((state) => state.todo);
  const [editTodo, setEditTodo] = useState(title);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <input
        type={"checkbox"}
        checked={completed}
        onChange={() => dispatch(onToggle({ id }))}
      />
      <span style={{ textDecoration: completed ? "line-through" : "" }}>
        {isEdit && editingTodo.id === id ? (
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        ) : (
          title
        )}
      </span>
      <button
        onClick={() =>
          isEdit && editingTodo.id === id
            ? dispatch(updateTodoAsyncThunk({ id, title: editTodo, completed }))
            : dispatch(onEdit({ id, title, completed }))
        }
      >
        {isEdit && editingTodo.id === id ? "save" : "edit"}
      </button>
      <button onClick={() => dispatch(delTodoAsyncThunk({ id }))}>
        delete
      </button>
    </Wrapper>
  );
}

export default Todo;
