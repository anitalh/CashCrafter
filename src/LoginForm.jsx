import { useState } from 'react';
import './loginform.css';
import {
  SERVER,
} from './constants';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Handle username input change
  function onChange(e) {
    setUsername(e.target.value);
    if (error) setError('');
  }

  // Function to handle form submission
  function onSubmit(e) {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
    else {
      setError(SERVER.REQUIRED_USERNAME);
    }
  }

  // Rendering the login form
  return (
    <div className="login">
      <form className="login__form" action="#/login" onSubmit={onSubmit}>
        <label>
          <span>Username:</span>
          <input className="login__username" value={username} placeholder="Enter Username" onChange={onChange} />
        </label>
        {error && <div className="login__error">{error}</div>}
        <button className="login__button" type="submit">Login</button>
      </form>
    </div>
  );

}

export default LoginForm;
