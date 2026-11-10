"use client";
import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TaskItem({ task }) {
  // Добавили toggleComplete для чекбокса
  const { toggleTimer, toggleComplete, deleteTask, renameTask } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleRename = () => {
    if (editTitle.trim()) renameTask(task.id, editTitle);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center justify-between p-3 border-b last:border-0 ${task.isCompleted ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3 flex-1">
        {/* Заменили toggleTimer на toggleComplete */}
        <input 
          type="checkbox" 
          checked={task.isCompleted} 
          onChange={() => toggleComplete(task.id)} 
          className="w-5 h-5 cursor-pointer" 
        />
        {isEditing ? (
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            onBlur={handleRename} 
            onKeyDown={(e) => e.key === "Enter" && handleRename()} 
            className="border-b outline-none flex-1" 
            autoFocus 
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)} 
            className={`flex-1 cursor-text ${task.isCompleted ? 'line-through' : ''}`}
          >
            {task.title}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-mono font-bold ${task.isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          {formatTime(task.remainingSeconds)}
        </span>
        {/* Кнопка Старт/Пауза осталась с toggleTimer */}
        {!task.isCompleted && (
          <button 
            onClick={() => toggleTimer(task.id)} 
            className="text-sm px-2 py-1 bg-gray-200 rounded"
          >
            {task.isActive ? "Пауза" : "Старт"}
          </button>
        )}
        <button 
          onClick={() => deleteTask(task.id)} 
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}