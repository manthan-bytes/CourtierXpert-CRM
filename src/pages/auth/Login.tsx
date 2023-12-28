// create login page component
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/features/AuthSlice';
import { useAppDispatch } from '../../store/store';
import ButtonSubmit from '../../components/Button/ButtonSubmit';

const Login = () => {

  // state for email and password
  const [username, setUsername] = useState<string>('kminchelle');
  const [password, setPassword] = useState<string>('0lelplR');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  // submit handler
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username: username, password: password })).then((response: any) => {
      localStorage.setItem('token', response.payload.token);
      navigate('/dashboard');
    }).catch((err: any) => {
      console.log('Login submit err', err);
    });
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form onSubmit={submitHandler}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="text" className="form-control" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <ButtonSubmit title="Login" disabled={false} />
          </form>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;