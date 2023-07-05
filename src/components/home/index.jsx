import React, { useState } from "react";
import "./home.scss";

import { Input } from "antd";
import { Button } from "react-bootstrap";
import { nanoid } from "@reduxjs/toolkit";

function index() {
  const [todos, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateVal, setUpdateVal] = useState(null);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text) {
      window.alert("Please input todo!");
    } else if (text && isEdit) {
      setTodo(
        todos.map((todo) => {
          if (todo.id === updateVal.id) {
            return { ...todo, name: text };
          }
          return todo;
        })
      );
      setText("");
      setIsEdit(false);
    } else {
      setTodo([...todos, { id: nanoid(), name: text, status: false }]);
      setText("");
      document.getElementById("todo").focus();
    }
  };

  const deleteTodo = (todo) => {
    const newTodos = todos.filter((data) => data.id !== todo.id);
    setTodo(newTodos);
  };

  const updateTodo = (todo) => {
    const findTodo = todos.find((data) => data.id === todo.id);
    console.log(findTodo);
    setText(findTodo.name);
    document.getElementById("todo").focus();
    setUpdateVal(findTodo);
  };

  return (
    <div className="home">
      <div className="container">
        <div style={{ gap: "10px", height: "45px" }} className="w-100 d-flex">
          <div style={{ width: "70%" }}>
            <Input
              id="todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "45px" }}
              placeholder="Enter todo"
            />
          </div>
          <div style={{ width: "30%" }}>
            <Button
              onClick={addTodo}
              style={{ height: "45px" }}
              className="w-100"
            >
              {isEdit ? "Update" : "Add"}
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "1px solid black",
            height: "30vh",
            marginTop: "10px",
          }}
        >
          {todos.length === 0 && "No Todos"}
          {todos.length !== 0 &&
            todos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <label>{todo.name}</label>
                <div>
                  <Button
                    onClick={() => {
                      updateTodo(todo);
                      setIsEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => deleteTodo(todo)} variant="warning">
                    Del
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default index;
