import "./globals.css";
import { TodoProvider } from "./context/TodoContext";

export const metadata = { title: "Todo App", description: "Менеджер задач" };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <TodoProvider>
          <main className="min-h-screen bg-gray-50 py-10 px-4 text-gray-900">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
              {children}
            </div>
          </main>
        </TodoProvider>
      </body>
    </html>
  );
}