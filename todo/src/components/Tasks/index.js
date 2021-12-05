import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
const Tasks = () => {
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
    let deleteTask = await axios.put(
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
      { task: edit },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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

  return (
    <div>
      <form onSubmit={(e) => newTask(e)}>
        {" "}
        <input type="text" name="task" placeholder="New task" />
        <input
          type="submit"
          value="Login"
          id="loginBtn"
          className="btn btn-primary"
        />
      </form>
      {tasks.length > 0 ? (
        <>
          {tasks.map((item) => {
            return (
              <div key={item._id}>
                {" "}
                <h1>{item.task}</h1>
                <button onClick={() => deleteTask(item._id)}>Delete</button>
                <form onSubmit={(e) => updateTask(e, item._id)}>
                  <div>
                    {btn1 ? (
                      <input
                        type="button"
                        value="Edit Task"
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
                          onClick={(e) => updateTask(e, item._id)}
                        />
                        <input
                          type="text"
                          onChange={(e) => setEdit(e.target.value)}
                          placeholder=" New Task"
                        />
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  {/* <input type="text" name="update" placeholder="Edit task" /> */}
                  {/* <input
                    type="submit"
                    name="update"
                    value="Update"
                    placeholder="Update task"
                  /> */}
                </form>
              </div>
            );
          })}{" "}
        </>
      ) : (
        <> No tasks</>
      )}
    </div>
  );
};

export default Tasks;
