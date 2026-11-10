"use client";
import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TaskForm() {
  const { addTask } = useTodo();
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;

    if (!title.trim()) return setError("Введите название");
    if (mins === 0 && secs === 0) return setError("Введите время > 0");
    if (secs > 59) return setError("Секунды не могут быть > 59");

    addTask(title, mins, secs);
    setTitle(""); setMinutes(""); setSeconds(""); setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 border-b pb-6">
      <div className="flex gap-2">
        <input type="text" placeholder="Добавить задачу..." value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="number" placeholder="Мин" min="0" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-16 border rounded-lg px-2 py-2 text-center" />
        <input type="number" placeholder="Сек" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.value)} className="w-16 border rounded-lg px-2 py-2 text-center" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Добавить</button>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </form>
  );
}