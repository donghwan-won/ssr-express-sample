import { useState } from "react";

const Button = () => {
  const [count, setCount] = useState(10);
  return (
    <div
      style={{
        backgroundColor: "#f3e5f5",
        padding: "20px",
        borderRadius: "8px",
        border: "2px solid #9c27b0",
      }}
    >
      <button
        onClick={() => setCount(count + 1)}
        style={{
          backgroundColor: "#9c27b0",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Remote App 1 Button
      </button>
      <p style={{ color: "#7b1fa2", fontWeight: "bold", marginTop: "10px" }}>
        Count from Remote App 1: {count}
      </p>
    </div>
  );
};

export default Button;
