"use client";
import { useState, useRef } from "react";

export default function EventDelegationDemo() {
  const [items, setItems] = useState([
    { id: 1, text: "Click me!", count: 0 },
    { id: 2, text: "Or me!", count: 0 },
    { id: 3, text: "Me too!", count: 0 }
  ]);
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // React 19: Improved event delegation automatically optimizes this
  const handleItemClick = (id: number) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, count: item.count + 1 }
        : item
    ));
    addLog(`Item ${id} clicked (React 19 optimized event)`);
  };

  // Add many items dynamically
  const addManyItems = () => {
    const newItems = Array.from({ length: 100 }, (_, i) => ({
      id: items.length + i + 1,
      text: `Dynamic item ${i + 1}`,
      count: 0
    }));
    setItems(prev => [...prev, ...newItems]);
    addLog(`Added 100 items - React 19 event delegation handles this efficiently!`);
  };

  // Remove all dynamic items
  const removeDynamicItems = () => {
    setItems(prev => prev.slice(0, 3));
    addLog("Removed dynamic items");
  };

  // Manual event delegation example (for comparison)
  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.itemId) {
      const id = parseInt(target.dataset.itemId);
      handleItemClick(id);
      addLog(`Manual delegation detected click on item ${id}`);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", border: "1px solid #ddd", borderRadius: "8px", margin: "2rem 0" }}>
      <h2>🎯 React 19 Event Delegation Improvements</h2>
      
      <div style={{ fontSize: "0.9rem", color: "#666", backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "4px", marginBottom: "1rem" }}>
        <h3>📝 What&apos;s improved in React 19:</h3>
        <ul>
          <li><strong>Better Performance:</strong> More efficient event delegation</li>
          <li><strong>Cleaner Listeners:</strong> Automatic cleanup and optimization</li>
          <li><strong>Memory Efficient:</strong> Fewer event listeners for large lists</li>
          <li><strong>Dynamic Elements:</strong> Better handling of dynamically added/removed elements</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={addManyItems}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Add 100 Items (Test Performance)
        </button>

        <button
          onClick={removeDynamicItems}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Remove Dynamic Items
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3>🚀 React 19 Automatic Event Delegation:</h3>
        <div style={{ 
          maxHeight: "200px", 
          overflowY: "auto", 
          border: "1px solid #ddd", 
          borderRadius: "4px", 
          padding: "0.5rem",
          backgroundColor: "#f9f9f9",
          color: "#333"
        }}>
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              style={{
                padding: "0.5rem",
                margin: "0.25rem 0",
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e3f2fd")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <span>{item.text}</span>
              <span style={{ 
                backgroundColor: item.count > 0 ? "#4caf50" : "#ccc", 
                color: "white", 
                padding: "0.25rem 0.5rem", 
                borderRadius: "12px", 
                fontSize: "0.8rem" 
              }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}>
          ⚡ React 19 automatically optimizes event listeners for {items.length} items
        </p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3>📋 Manual Event Delegation (Comparison):</h3>
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "4px",
            padding: "1rem",
            backgroundColor: "#fafafa"
          }}
        >
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#666" }}>
            Click any item below (uses manual event delegation):
          </p>
          {items.slice(0, 3).map(item => (
            <button
              key={`manual-${item.id}`}
              data-item-id={item.id}
              style={{
                margin: "0.25rem",
                padding: "0.5rem",
                backgroundColor: "#fff3cd",
                border: "1px solid #ffeaa7",
                borderRadius: "4px",
                cursor: "pointer",
                color: "#ff6a00"
              }}
            >
              Manual: {item.text} ({item.count})
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>📊 Event Logs:</h3>
        <div style={{
          backgroundColor: "#1e1e1e",
          color: "#00ff00",
          padding: "1rem",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "0.8rem",
          minHeight: "100px",
          maxHeight: "150px",
          overflowY: "auto"
        }}>
          {logs.length === 0 ? (
            <div style={{ color: "#666" }}>Click items to see event logs...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))
          )}
        </div>
      </div>

      <div style={{ fontSize: "0.8rem", color: "#666", backgroundColor: "#f0f8ff", padding: "1rem", borderRadius: "4px", marginTop: "1rem" }}>
        <h4>🧠 React 19 Event Delegation Benefits:</h4>
        <ul>
          <li><strong>Performance:</strong> Fewer DOM event listeners attached</li>
          <li><strong>Memory:</strong> Lower memory usage for large lists</li>
          <li><strong>Dynamic Content:</strong> Better handling of added/removed elements</li>
          <li><strong>Automatic:</strong> All optimizations happen automatically</li>
        </ul>
      </div>
    </div>
  );
}
