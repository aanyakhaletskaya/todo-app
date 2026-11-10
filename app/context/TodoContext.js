"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todo-tasks");
    if (saved) setTasks(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    if (isLoaded) localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  // Таймер
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

  // Добавление задачи
  const addTask = (title, minutes, seconds) => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    if (!title.trim() || totalSeconds <= 0) return;
    
    setTasks((prev) => [
      {
        id: Date.now().toString(),
        title,
        totalSeconds,
        remainingSeconds: totalSeconds,
        isActive: false,
        isCompleted: false,
      },
      ...prev,
    ]);
  };

  // Старт/Пауза (только для кнопки)
  const toggleTimer = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id && !t.isCompleted ? { ...t, isActive: !t.isActive } : t
      )
    );
  };

  // Отметить выполненной (только для галочки)
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newCompleted = !t.isCompleted;
          return {
            ...t,
            isCompleted: newCompleted,
            // Если задачу выполнили, останавливаем таймер
            isActive: newCompleted ? false : t.isActive, 
          };
        }
        return t;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const renameTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.isCompleted));
  };

  return (
    <TodoContext.Provider
      value={{ 
        tasks, 
        addTask, 
        toggleTimer, 
        toggleComplete, 
        deleteTask, 
        renameTask, 
        clearCompleted 
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);