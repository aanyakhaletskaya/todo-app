"use client";
import { useTodo } from "../context/TodoContext";

export default function TaskFilters({ filter, setFilter }) {
  const { tasks, clearCompleted } = useTodo();
  const activeCount = tasks.filter(t => !t.isCompleted).length;
  const filters = [{ id: "all", label: "Все" }, { id: "active", label: "Активные" }, { id: "completed", label: "Выполненные" }];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-4 border-t text-sm text-gray-500 gap-4">
      <span>{activeCount} активных</span>
      <div className="flex gap-2">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1 rounded ${filter === f.id ? 'border border-gray-300 bg-gray-100' : ''}`}>{f.label}</button>
        ))}
      </div>
      <button onClick={clearCompleted} className="hover:underline">Удалить выполненные</button>
    </div>
  );
}