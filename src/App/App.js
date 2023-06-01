import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import config from "../config.json";

function App() {
  const [state, setState] = useState({
    todoItems: [],
    showResult: false,
    apiMessage: "",
    error: null,
  });
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithPopup} = useAuth0();


  useEffect(() => {
    // fires when app component mounts to the DOM
    console.log('init useEffect')
    
    callApi().catch(error => console.error('Init error', error))
  }, []);

  useEffect(() => {
    // fires when todos array gets updated
    console.log('update', JSON.stringify(state.todoItems))
    
  }, [state.todoItems]);
  
  const callApi = async () => {
    try {
      const {apiOrigin} = config;
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiOrigin}/dev/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let responseData = await response.json();
      responseData = responseData.map((todo) => {
        if (todo.completed === undefined) {
          todo.completed = false;
        }
        return todo;
      })
      console.log(responseData);

      if (responseData) {
        setState({
          ...state, todoItems: responseData,
          error: null
        });
      }
    } catch (error) {
      console.error(error.error)
      setState({
        ...state,
        error: error.error || error.message
      });
    }
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };
  
  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  function addTodo(todo) {
    // adds new todo to beginning of todos array
    console.log('add', isAuthenticated, user, state.todoItems)
    setState({
      ...state, todoItems: [todo, ...state.todoItems]
    });
  }

  function toggleComplete(_id) {
    setState(
      {
        ...state, todoItems:
          state.todoItems.map(todo => {
            if (todo._id === _id) {
              return {
                ...todo,
                completed: !todo.completed
              };
            }
            return todo;
          })
      }
    );
  }

  function removeTodo(_id) {
    setState({ ...state, todoItems: state.todoItems.filter(todo => todo._id !== _id) });
  }

  return (
    <div className="App">
      <Typography style={{ padding: 10 }} variant="h2">
        React Todo
      </Typography>
      <Typography style={{ padding: 10 }} variant="subtitle1">
        Auth0.com authentication - Codehooks.io API Backend
      </Typography>
      {state.error === "login_required" && (
          <div style={{color: 'red'}}>
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </div>
        )}
      <div style={{ padding: 10 }}>
        {isAuthenticated ? '' : <LoginButton />}
        {isAuthenticated ? <LogoutButton /> : ''}
      </div>
      <Profile />
      {state.error !== null ?? (
          <Typography style={{color: 'red'}} variant="subtitle1">{state.error}</Typography>
        )}
      {isLoading ?? (
        <div>Loading ...</div>
      )}
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={isAuthenticated ? state.todoItems : []}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
        isAuthenticated={isAuthenticated}        
      />
    </div>
  );
}

export default App;