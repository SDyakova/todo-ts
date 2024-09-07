import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Добро пожаловать на главную страницу!</h1>

      <Link to="/todo_1">Todo_1</Link>
      <Link to="/todo_2">Todo_2</Link>
      <Link to="/todo_3">TodoList_v3</Link>
      <Link to="/todo_4">TodoList_v4</Link>
    </div>
  );
}

export default Home;
