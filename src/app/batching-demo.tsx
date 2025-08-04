"use client";
import { useState, useRef, useEffect } from "react";

export default function BatchingDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    console.log(`🔄 Render count: ${renderCount.current}`);
  });

  // React 19: Multiple state updates are automatically batched
  const handleMultipleUpdates = () => {
    
    // All these updates will be batched into a single re-render
    setCount(prev => prev + 1);
    setName(`User ${count + 1}`);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    console.log("✅ After updates - Should only cause 1 re-render!");
  };

  // React 19: Even async updates are batched
  const handleAsyncUpdates = async () => {
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // These async updates are also batched!
    setCount(prev => prev + 2);
    setName(`Async User ${count + 2}`);
    setIsLoading(false);
    
    console.log("✅ After async updates - Still batched!");
  };

  // Compare with manual batching (if needed for specific cases)
  const handleManualBatching = () => {
    console.log("🔄 Manual batching example");
    
    // In rare cases, you might want to force separate renders
    setCount(prev => prev + 1);
    
    // Force a separate render using setTimeout
    setTimeout(() => {
      setName(`Manual User ${count + 1}`);
    }, 0);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", border: "1px solid #ddd", borderRadius: "8px", margin: "2rem 0" }}>
      <h2>⚡ React 19 Automatic Batching Demo</h2>
      
      <div style={{ backgroundColor: "#f0f8ff", color: "#666", padding: "1rem", borderRadius: "4px", marginBottom: "1rem" }}>
        <h3>Current State:</h3>
        <p><strong>Count:</strong> {count}</p>
        <p><strong>Name:</strong> {name || "None"}</p>
        <p><strong>Loading:</strong> {isLoading ? "Yes" : "No"}</p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3>📝 Instructions:</h3>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          Open the browser console and click the buttons below. Notice how multiple state updates 
          are automatically batched into a single re-render, even for async operations!
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <button
          onClick={handleMultipleUpdates}
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Multiple Sync Updates (Batched)
        </button>

        <button
          onClick={handleAsyncUpdates}
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Async Updates (Also Batched!)
        </button>

        <button
          onClick={handleManualBatching}
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Manual Unbatched (2 renders)
        </button>
      </div>

      <div style={{ fontSize: "0.8rem", color: "#666", backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "4px" }}>
        <h4>🧠 What&apos;s happening:</h4>
        <ul>
          <li><strong>React 18:</strong> Only event handlers were batched</li>
          <li><strong>React 19:</strong> ALL updates are automatically batched (timeouts, promises, native events)</li>
          <li><strong>Performance:</strong> Fewer re-renders = better performance</li>
          <li><strong>Automatic:</strong> No configuration needed, just works!</li>
        </ul>
      </div>
    </div>
  );
}
