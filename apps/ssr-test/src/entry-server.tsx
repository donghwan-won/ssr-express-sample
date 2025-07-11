// entry-server.tsx
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";

// props 타입 정의
interface RenderOptions {
  initialData?: string;
  serverComponents?: Record<string, React.ReactNode>;
  remoteComponents?: Record<string, React.ReactNode>;
  onShellReady: () => void;
  onShellError: () => void;
  onError: (err: unknown) => void;
}

export function render(
  url: string,
  {
    initialData,
    serverComponents,
    remoteComponents,
    ...callbacks
  }: RenderOptions
) {
  return renderToPipeableStream(
    <StrictMode>
      <App
        url={url}
        initialData={initialData}
        serverComponents={serverComponents}
      />
    </StrictMode>,
    {
      ...callbacks,
    }
  );
}
