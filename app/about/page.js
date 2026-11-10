import Link from "next/link";

export default function About() {
  return (
    <div>
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Назад к задачам</Link>
      <h1 className="text-2xl font-bold mb-4">О приложении</h1>
      <p className="text-gray-600 mb-2">Это менеджер задач с таймером, созданный в рамках учебного проекта на Next.js.</p>
      <p className="text-gray-600 mb-2">Автор: <strong>Халецкая Анна</strong>.</p>
      <p className="text-gray-600">Приложение сохраняет ваши задачи в localStorage, поэтому они не пропадут при обновлении страницы.</p>
    </div>
  );
}