import { List } from '@mui/material';
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, removeTodo, toggleComplete, isAuthenticated }) => {  
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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