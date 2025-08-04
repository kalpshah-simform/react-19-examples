"use client";
import Image from "next/image";
import { useOptimistic, useState, useActionState } from "react";
import { submitFeedbackAction, addTodoAction } from "./actions";
import MemoizationDemo from "./memoization-demo";
import styles from "./page.module.css";
import NoMemoizationDemo from "./no-memoization-demo";

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React 19", completed: false },
    { id: 2, text: "Try useOptimistic", completed: false }
  ]);
  
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: { id: number; text: string; completed: boolean }) => [
      ...state,
      newTodo
    ]
  );

  // useActionState for feedback form
  const [feedbackState, submitFeedback, isPending] = useActionState(
    submitFeedbackAction,
    { success: false, message: "", data: null }
  );

  const handleAddTodo = async (formData: FormData) => {
    const text = formData.get("todo") as string;
    if (!text.trim()) return;

    // Optimistically add the todo immediately
    const optimisticTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    addOptimisticTodo(optimisticTodo);

    try {
      // Simulate server action
      const newTodo = await addTodoAction(text);
      setTodos(prev => [...prev, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
      // In a real app, you might want to show an error message
      // and the optimistic update will be reverted automatically
    }
  };
  console.log(optimisticTodos, todos);
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div style={{ margin: "2rem 0", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px" }}>
          <h2>useOptimistic Example - Todo List</h2>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
            Add a todo below. Notice how it appears instantly (optimistic update) before the server responds!
          </p>
          
          <form action={handleAddTodo} style={{ marginBottom: "1rem" }}>
            <input
              name="todo"
              type="text"
              placeholder="Enter a new todo..."
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ddd"
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Add Todo
            </button>
          </form>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {optimisticTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  padding: "0.5rem",
                  margin: "0.25rem 0",
                  backgroundColor: "#d55a5a",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  opacity: todos.find(t => t.id === todo.id) ? 1 : 0.6
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>
                  {todos.find(t => t.id === todo.id) ? "✅" : "⏳"}
                </span>
                {todo.text}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: "2rem 0", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px" }}>
          <h2>useActionState Example - Feedback Form</h2>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
            Submit feedback with automatic loading states and error handling!
          </p>
          
          <form action={submitFeedback} style={{ marginBottom: "1rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="rating" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Rating:
              </label>
              <select
                id="rating"
                name="rating"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ddd"
                }}
              >
                <option value="">Select a rating</option>
                <option value="excellent">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="good">⭐⭐⭐⭐ Good</option>
                <option value="average">⭐⭐⭐ Average</option>
                <option value="poor">⭐⭐ Poor</option>
                <option value="terrible">⭐ Terrible</option>
              </select>
            </div>
            
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="feedback" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Feedback:
              </label>
              <textarea
                id="feedback"
                name="feedback"
                placeholder="Tell us what you think..."
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>
            
            <button
              type="submit"
              disabled={isPending}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: isPending ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isPending ? "not-allowed" : "pointer",
                width: "100%"
              }}
            >
              {isPending ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>

          {feedbackState.message && (
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "4px",
                backgroundColor: feedbackState.success ? "#d4edda" : "#f8d7da",
                border: `1px solid ${feedbackState.success ? "#c3e6cb" : "#f5c6cb"}`,
                color: feedbackState.success ? "#155724" : "#721c24"
              }}
            >
              {feedbackState.message}
            </div>
          )}
        </div>
        <MemoizationDemo />
        <NoMemoizationDemo />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
