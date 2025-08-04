"use client";
import { useState } from "react";

// This component will be automatically memoized by React Compiler
function ExpensiveComponent({ data }: { data: string[] }) {
  "use no memo";
  console.log("ExpensiveComponent rendered with:", data.length, "items");
  
  // This calculation will be automatically memoized
  const expensiveCalculation = data.reduce((sum, item) => {
    return sum + item.length;
  }, 0);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", margin: "1rem 0" }}>
      <h3>Not Memoized Component</h3>
      <p>Total characters: {expensiveCalculation}</p>
      <p>Items count: {data.length}</p>
    </div>
  );
}

export default function NoMemoizationDemo() {
  "use no memo";
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(["apple", "banana", "cherry"]);

  // This function will be automatically memoized
  const handleAddItem = () => {
    setItems(prev => [...prev, `item-${Date.now()}`]);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2>🧠 React 19 Not Memoization Demo</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        >
          Count: {count} (won't re-render ExpensiveComponent)
        </button>
        
        <button 
          onClick={handleAddItem}
          style={{ padding: "0.5rem" }}
        >
          Add Item (will re-render ExpensiveComponent)
        </button>
      </div>

      <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
        <p>📝 <strong>Instructions:</strong></p>
        <ul>
          <li>Click "Count" button - ExpensiveComponent won't re-render (check console)</li>
          <li>Click "Add Item" - ExpensiveComponent will re-render because props changed</li>
          <li>React Compiler automatically optimizes this without manual memo/useMemo!</li>
        </ul>
      </div>

      <ExpensiveComponent data={items} />
    </div>
  );
}
