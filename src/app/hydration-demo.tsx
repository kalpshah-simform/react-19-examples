"use client";
import { useState, useEffect } from "react";

// Component that intentionally creates hydration mismatches for demo
function HydrationMismatchDemo() {
  const [isClient, setIsClient] = useState(false);
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
  }, []);

  // This will cause a hydration mismatch (server renders different from client)
  const serverClientDifference = isClient ? "Client Rendered" : "Server Rendered";

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}>
      <h3>🔧 Hydration Mismatch Example</h3>
      
      <div style={{ backgroundColor: "#ffc400ff", padding: "0.75rem", borderRadius: "4px", marginBottom: "1rem" }}>
        <p><strong>Content:</strong> {serverClientDifference}</p>
        <p><strong>Current Time:</strong> {currentTime ? currentTime.toLocaleTimeString() : "Loading..."}</p>
        <p><strong>Interactive Count:</strong> {count}</p>
      </div>

      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Test Interactivity: {count}
      </button>

      <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}>
        🧠 React 19 handles the server/client mismatch more gracefully
      </div>
    </div>
  );
}

// Component that demonstrates streaming hydration
function StreamingHydrationDemo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // Simulate streaming data
    const loadData = async () => {
      for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(prev => [...prev, `Streamed item ${i}`]);
      }
      setIsLoaded(true);
    };
    loadData();
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}>
      <h3>🌊 Streaming Hydration Demo</h3>
      
      <div style={{ minHeight: "100px", backgroundColor: "#0080ffff", padding: "0.75rem", borderRadius: "4px" }}>
        {data.length === 0 ? (
          <div style={{ color: "#666" }}>Loading streaming content...</div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1rem" }}>
            {data.map((item, index) => (
              <li key={index} style={{ marginBottom: "0.25rem" }}>
                {item} {index === data.length - 1 && !isLoaded && "⏳"}
              </li>
            ))}
          </ul>
        )}
        {isLoaded && (
          <div style={{ marginTop: "0.5rem", color: "#28a745", fontWeight: "bold" }}>
            ✅ All content hydrated successfully!
          </div>
        )}
      </div>

      <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}>
        🧠 React 19 improved streaming hydration allows progressive enhancement
      </div>
    </div>
  );
}

// Error boundary for hydration errors
function HydrationErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string>("");

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("hydration") || event.message.includes("mismatch")) {
        setHasError(true);
        setErrorInfo(event.message);
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div style={{ 
        padding: "1rem", 
        backgroundColor: "#f8d7da", 
        border: "1px solid #f5c6cb", 
        borderRadius: "4px",
        color: "#721c24"
      }}>
        <h3>⚠️ Hydration Error Detected</h3>
        <p>React 19 Error Recovery:</p>
        <code style={{ fontSize: "0.8rem" }}>{errorInfo}</code>
        <br />
        <button 
          onClick={() => {
            setHasError(false);
            setErrorInfo("");
          }}
          style={{
            marginTop: "0.5rem",
            padding: "0.25rem 0.5rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Retry Hydration
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default function HydrationDemo() {
  return (
    <div style={{ padding: "2rem", maxWidth: "700px", border: "1px solid #ddd", borderRadius: "8px", margin: "2rem 0" }}>
      <h2>🌊 React 19 Hydration Improvements</h2>
      
      <div style={{ fontSize: "0.9rem", color: "#666", backgroundColor: "#e7f3ff", padding: "1rem", borderRadius: "4px", marginBottom: "1rem" }}>
        <h3>🚀 What&apos;s New in React 19 Hydration:</h3>
        <ul>
          <li><strong>Better Error Recovery:</strong> Graceful handling of hydration mismatches</li>
          <li><strong>Selective Hydration:</strong> Priority-based hydration of components</li>
          <li><strong>Streaming Improvements:</strong> Better support for streaming SSR</li>
          <li><strong>Concurrent Hydration:</strong> Non-blocking hydration process</li>
          <li><strong>Automatic Retries:</strong> Built-in retry mechanisms for failed hydration</li>
        </ul>
      </div>

      <HydrationErrorBoundary>
        <HydrationMismatchDemo />
        <StreamingHydrationDemo />
      </HydrationErrorBoundary>

      <div style={{ 
        fontSize: "0.8rem", 
        color: "#666", 
        backgroundColor: "#d1ecf1", 
        padding: "1rem", 
        borderRadius: "4px",
        marginTop: "1rem"
      }}>
        <h4>💡 Benefits for Your App:</h4>
        <ul>
          <li><strong>Better UX:</strong> Users can interact with partially hydrated content</li>
          <li><strong>Faster TTI:</strong> Time to Interactive is reduced with selective hydration</li>
          <li><strong>More Reliable:</strong> Better error handling prevents white screens</li>
          <li><strong>Better Performance:</strong> Concurrent hydration doesn&apos;t block the main thread</li>
        </ul>
      </div>
    </div>
  );
}
