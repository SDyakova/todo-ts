import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import styles from "./App.module.css";
import Home from "../Home";
import Todo from "../Todo";
import Todo_2 from "../Todo_2";
import TodoList_v3 from "../TodoList_v3";

function App() {
  return (
    <Router>
      <div className={styles.wrapper}>
        <nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo_1" element={<Todo />} />
            <Route path="/todo_2" element={<Todo_2 />} />
            <Route path="/todo_3" element={<TodoList_v3 />} />
            {/* Другие маршруты можно добавлять здесь */}
          </Routes>
        </nav>
      </div>
    </Router>
  );
}

export default App;
