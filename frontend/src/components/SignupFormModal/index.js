import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
          image
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  const updateFile = e => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };
  return (
    <div className="Signup-card">
      <h1 className="signup">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
         
          <input className="firstname"
          placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        {errors.firstName && <p>{errors.firstName}</p>}
        <div>
         
          <input className="lastname"
          placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        {errors.lastName && <p>{errors.lastName}</p>}
        <div>
         
          <input className="email"
          placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errors.email && <p>{errors.email}</p>}
        <div>
          
          <input className="username"
          placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {errors.username && <p>{errors.username}</p>}
        <div>
          
          <input className="password"
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.password && <p>{errors.password}</p>}
        <div>
          
          <input className="confirm-password"
          placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <label>
          Avatar
          <input type="file" onChange={updateFile} />
        </label>
        <button className="signup-btn" disabled = {username.length < 4 || password.length < 6 || firstName.length <= 0 || lastName.length <= 0 || email.length <= 0 || confirmPassword.length <= 0} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;