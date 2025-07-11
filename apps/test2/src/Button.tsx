import { useState } from "react";

const Button = () => {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        backgroundColor: "#e3f2fd",
        padding: "20px",
        borderRadius: "8px",
        border: "2px solid #2196f3",
      }}
    >
      <button
        onClick={() => setCount(count + 1)}
        style={{
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Remote App 2 Button
      </button>
      <p style={{ color: "#1976d2", fontWeight: "bold", marginTop: "10px" }}>
        Count from Remote App 2: {count}
      </p>
    </div>
  );
};

export default Button;
