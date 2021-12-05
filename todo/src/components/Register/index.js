import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [role, setRole] = useState("61a5f3da99ca3c5064ba5c6d");
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const items = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    setUsers(items.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const register = async () => {
    let check = false;
    // eslint-disable-next-line
    users.map((item) => {
      // eslint-disable-next-line
      if (item.email == email) {
        check = true;
      }
    });
    if (check) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " email alerady exists",
      });
    } else {
      // eslint-disable-next-line
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resgister`,
        {
          email,
          password,
        }
      );
    }
  };

  const login = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <h1>Register </h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="submit"
        value="Register"
        className="btn btn-primary"
        onClick={register}
      />
      <p onClick={login}>Already have an account?</p>
    </div>
  );
};

export default Register;
