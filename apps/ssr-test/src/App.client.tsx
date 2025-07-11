import "./App.css";
import { Suspense, lazy } from "react";

const RemoteButton = lazy(() =>
  import("remoteApp/Button").catch((error) => {
    return {
      default: () => <div>Failed to load Remote App 1</div>,
    };
  })
);

const RemoteButton2 = lazy(() =>
  import("remoteApp2/Button").catch((error) => {
    return {
      default: () => <div>Failed to load Remote App 2</div>,
    };
  })
);

function AppClient() {
  console.log("client");
  return (
    <>
      <h1>Vite + React + Express</h1>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
        <h2>💻 Client-Side Rendering (CSR)</h2>
        <div
          style={{
            backgroundColor: "#f3e5f5",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <h3>🔧 Remote Components (Client-Loaded):</h3>
          <div style={{ margin: "20px 0" }}>
            <h4>Remote App 1 (test1):</h4>
            <Suspense fallback={<div>Loading Remote App 1...</div>}>
              <RemoteButton />
            </Suspense>
          </div>
          <div style={{ margin: "20px 0" }}>
            <h4>Remote App 2 (test2):</h4>
            <Suspense fallback={<div>Loading Remote App 2...</div>}>
              <RemoteButton2 />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppClient;
