import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    // fires when todos array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    // adds new todo to beginning of todos array
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <Typography style={{ padding: 10 }} variant="h1">
        React Todo
      </Typography>
      <Typography style={{ padding: 10 }} variant="h4">
        Codehooks.io API Backend
      </Typography>
      <div style={{ padding: 10 }}>
        {isAuthenticated ? '' : <LoginButton />}
        {isAuthenticated ? <LogoutButton /> : ''}
      </div>
      <Profile />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={isAuthenticated ? todos : []}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

export default App;