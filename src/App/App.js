import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import config from "../config.json";

const {apiOrigin} = config;

function App() {
  const [state, setState] = useState({
    todoItems: [],
    showResult: false,
    apiMessage: "",
    error: null,
  });
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithPopup, loginWithRedirect, getAccessTokenWithPopup} = useAuth0();


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
      
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiOrigin}/dev/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetch data', response.status, response.statusText)
      let responseData = await response.json();
      console.log('Get data', responseData);
      responseData = responseData.map((todo) => {
        if (todo.completed === undefined) {
          todo.completed = false;
        }
        return todo;
      })
      

      if (responseData) {
        setState({
          ...state, todoItems: responseData,
          error: null
        });
      }
    } catch (error) {
      console.error('API error', error)
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

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
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

  async function addTodo(todo) {
    // adds new todo to beginning of todos array  
    
    const token = await getAccessTokenSilently();
    console.log('add', todo)
    const response = await fetch(`${apiOrigin}/dev/todo`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(todo)
    });
    console.log('Post data', response.status, response.statusText)
    let responseData = await response.json();
    console.log('Post data response', responseData);
    await callApi();
    
    /*setState({
      ...state, todoItems: [todo, ...state.todoItems]
    });*/
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
      
      <Profile />

      {state.error === "login_required" && (
          <Alert severity="warning">
            Authentication required: <Button variant="text" onClick={() => handleLoginAgain()}>Log In</Button>
          </Alert>
        )}
        {state.error === "consent_required" && (
          <Alert severity="warning">
            API concent required: <Button variant="text" onClick={() => handleConsent()}>Grant</Button>            
          </Alert>
        )}
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={isAuthenticated ? state.todoItems : []}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
        isAuthenticated={isAuthenticated}        
      />
      <div style={{ padding: 10 }}>
        {isAuthenticated ? <LogoutButton /> : ''}
      </div>
      
      {state.error !== null ?
          <Typography style={{color: 'red'}} variant="subtitle1">{state.error}</Typography>
        : ''
      }
    </div>
  );
}

export default App;