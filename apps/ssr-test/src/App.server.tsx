import "./App.css";

type Props = {
  initialData?: string;
  serverComponents?: Record<string, React.ReactNode>;
};

function AppServer({ serverComponents, initialData }: Props) {
  return (
    <>
      <h1>Vite + React + Express</h1>
      <h2>{initialData}</h2>
      <meta></meta>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
        <h2>🖥️ Server-Side Rendering Page</h2>
        <div
          style={{
            backgroundColor: "#f3e5f5",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <h3>🔧 Remote Components (Server-Loaded):</h3>
          <div style={{ margin: "20px 0" }}>
            <h4>Remote App 1 (test1):</h4>
            {serverComponents?.button}
          </div>
          <div style={{ margin: "20px 0" }}>
            <h4>Remote App 2 (test2):</h4>
            {serverComponents?.button2}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppServer;
