import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const Login = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let local = localStorage.getItem("token")
      setTokenLocal(local)
  }, [])

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokenLocal, setTokenLocal] = useState("");
  const reg = () => {
    navigate("/register");
  };

  const login = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    if (res) {
      // console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.result._id);
      console.log(res.data.result._id);

      let local = localStorage.getItem("token")
      // console.log("local",local);
      setTokenLocal(local)
      // navigate("/tasks");
    }
  };

  const tasks = () => {
    // navigate("/tasks");
  };

  return (
    <div>
      {tokenLocal ? (
        <button onChange={tasks()}></button>
      ) : (
        <>
          {" "}
          <h1>Login</h1>
          <form onSubmit={(e) => login(e)}>
            <input
              className="inputVal"
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="inputVal"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="submit"
              value="Login"
              id="loginBtn"
              className="btn btn-primary"
            />
          </form>
          <p onClick={reg}>Not have an account ?</p>{" "}
        </>
      )}
    </div>
  );
};

export default Login;