"use client";
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskFilters from "./components/TaskFilters";
import { useTodo } from "./context/TodoContext";
import Link from "next/link";

export default function Home() {
  const { tasks } = useTodo();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Мои задачи</h1>
        <Link href="/about" className="text-blue-600 hover:underline">О приложении</Link>
      </header>
      <TaskForm />
      <div className="min-h-[200px]">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">Список пуст</p>
        ) : (
          filteredTasks.map(task => <TaskItem key={task.id} task={task} />)
        )}
      </div>
      <TaskFilters filter={filter} setFilter={setFilter} />
    </div>
  );
}