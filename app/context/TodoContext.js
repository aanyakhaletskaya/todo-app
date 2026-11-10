"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("todo-tasks");
    if (saved) setTasks(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.isActive && task.remainingSeconds > 0) {
            const newRemaining = task.remainingSeconds - 1;
            return {
              ...task,
              remainingSeconds: newRemaining,
              isCompleted: newRemaining === 0 ? true : task.isCompleted,
              isActive: newRemaining === 0 ? false : task.isActive,
            };
          }
          return task;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = (title, minutes, seconds) => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    if (!title.trim() || totalSeconds <= 0) return;
    setTasks([{ id: Date.now().toString(), title, totalSeconds, remainingSeconds: totalSeconds, isActive: false, isCompleted: false }, ...tasks]);
  };

  const toggleTimer = (id) => setTasks(tasks.map(t => t.id === id && !t.isCompleted ? { ...t, isActive: !t.isActive } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const renameTask = (id, newTitle) => setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
  const clearCompleted = () => setTasks(tasks.filter(t => !t.isCompleted));

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTimer, deleteTask, renameTask, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);