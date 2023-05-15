import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();
  const demoUser = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
.then(closeModal)

};


const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
};

return (
  <>
  <div className="main">
    <div classname = 'login'>
    <h1 classname='login'>Log In</h1>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="login-user">
        <input className="login-input"
          placeholder='Username or Email'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </div>
      <div className="password">
        <input className="password-input"
          placeholder='Password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errors.credential && (
        <p>{errors.credential}</p>
      )}
      <button className="login-btn" disabled={credential.length < 4 || password.length < 6} type="submit">Log In</button>
      <div className="demodiv">
      <button className="demouser" onClick={(demoUser)}>Demo User</button>
    </div>
    </form>
</div>
  </>
);
}

export default LoginFormModal;