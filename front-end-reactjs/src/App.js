import React, { useCallback, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import axios from "axios";

const API_URL = "http://localhost:8000/api/";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = () => {
    axios
      .get(API_URL)
      .then((res) => {
        const todoTasks = res.data;
        setTodoList(todoTasks);
      })
      .catch((error) => console.log(error));
  };

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      axios.post(API_URL, { name: textInput }).then((res) => {
        const task = res.data;
        setTodoList([task, ...todoList]);
      });
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    axios.put(`${API_URL}${id}/`, { isCompleted: true }).then((res) => {
      const task = res.data;
      setTodoList((prevState) =>
        prevState.map((todo) =>
          todo.id === task.id
            ? {
                ...todo,
                isCompleted: task.isCompleted,
                updatedAt: task.updatedAt,
              }
            : todo
        )
      );
    });
  }, []);

  const onRemoveBtnClick = (id) => {
    axios.delete(`${API_URL}${id}/`).then((res) => {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    });
  };

  return (
    <>
      <h3>Danh sách việc cần làm</h3>
      <TextField
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            onAddBtnClick();
          }
        }}
      ></TextField>
      <TodoList
        todoList={todoList}
        onCheckBtnClick={onCheckBtnClick}
        onRemoveBtnClick={onRemoveBtnClick}
      />
    </>
  );
}

export default App;
