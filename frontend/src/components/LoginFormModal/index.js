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
      <label>
        Username or Email
        <input
          placeholder='Username or Email'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          placeholder='Password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {errors.credential && (
        <p>{errors.credential}</p>
      )}
      <button disabled={credential.length < 4 || password.length < 6} type="submit">Log In</button>
      <button className="demouser" onClick={(demoUser)}>Demo User</button>
    </form>
</div>
  </>
);
}

export default LoginFormModal;