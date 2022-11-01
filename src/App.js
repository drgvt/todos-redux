import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  // Todos component
  const Todos = () => {
    const dispatch = useDispatch(); // instad of mapDispatchToProps
    const todos = useSelector((state) => state.todos); // instead of mapStateToProps
    const handleClick = (id) =>
      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });

    if (!todos || !todos.length) {
      return <p>NO TODOS!</p>;
    }
    return (
      // otherwise return this
      <ul>
        {todos.map((todo) => (
          <li onClick={() => handleClick(todo.id)} key={todo.id}>
            {todo.label}
          </li>
        ))}
      </ul>
    );
  };

  // TodoInput component
  const TodoInput = () => {
    const dispatch = useDispatch();
    const [newTodo, setNewTodo] = useState("");
    const handleChange = (event) => setNewTodo(event.target.value);
    const handleClick = () => {
      dispatch({
        type: "ADD_TODO",
        payload: {
          label: newTodo,
          id: Math.ceil(Math.random() * 100),
        },
      });
      setNewTodo("");
    };

    return (
      <div>
        <input type="text" value={newTodo} onChange={handleChange} />
        <button onClick={handleClick}>ADD TODO</button>
      </div>
    );
  };

  // UI
  return (
    <div className="App">
      <p>Todos:</p>
      <Todos />
      <TodoInput />
    </div>
  );
}

export default App;
