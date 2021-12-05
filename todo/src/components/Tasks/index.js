import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style.css";

const Tasks = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");
  const [edit, setEdit] = useState("");

  const [btn1, setBtn1] = useState(true);
  const [showHide, setShowHide] = useState(false);

  const getId = () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    setId(id);
    setToken(token);
  };

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    getTasks();
  }, [id]);

  const getTasks = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/todoss/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTasks(res.data);
  };

  const deleteTask = async (idTask) => {
    let deleteTask = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deleteTask/${idTask}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    getTasks();
  };

  const newTask = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newTask/${id}`,
      { task: e.target[0].value },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    e.target[0].value = "";
    getTasks();
  };

  const updateTask = async (e, idTask) => {
    e.preventDefault();
    let newTask = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/upadteVal/${idTask}`,
      { task: edit },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setShowHide(!showHide);
    setBtn1(true);
    setEdit();
    getTasks();
  };

  const hide = () => {
    setShowHide(!showHide);
    setBtn1(false);
  };
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className="container">
      <form onSubmit={(e) => newTask(e)}>
        <input
          type="text"
          name="task"
          placeholder="New task"
          className="inpt"
        />
        <input
          type="submit"
          id="newTask"
          value="NEW TASK"
          className="btn btn-success inpt2"
        />
      </form>
      {tasks.length > 0 ? (
        <div className="cont">
          {tasks.map((item) => {
            return (
              <div key={item._id} className="task">
                {" "}
                <h1>{item.task}</h1>
                <button
                  className="btn btn-danger inpt2"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
                <form onSubmit={(e) => updateTask(e, item._id)}>
                  <div>
                    {btn1 ? (
                      <input
                        type="button"
                        value="Edit Task"
                        className="btn btn-info inpt2"
                        onClick={hide}
                      ></input>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  <div>
                    {showHide ? (
                      <div>
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-success inpt2"
                          id="idSub"
                          onClick={(e) => updateTask(e, item._id)}
                        />
                        <input
                          type="text"
                          onChange={(e) => setEdit(e.target.value)}
                          placeholder=" New Task"
                          className="inpt"
                        />
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </form>
              </div>
            );
          })}{" "}
        </div>
      ) : (
        <> No tasks</>
      )}
      <form>
        <button className="btn btn-dark" onClick={() => logout()}>
          Log out{" "}
        </button>
      </form>
    </div>
  );
};

export default Tasks;
