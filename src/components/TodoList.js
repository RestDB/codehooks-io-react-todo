import { List } from "@material-ui/core";
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, removeTodo, toggleComplete, isAuthenticated }) => {  
  return (
    <List>
      {todos.map(todo => (
        <Todo
          key={todo._id}
          todo={todo}
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </List>
  );
}

export default TodoList;