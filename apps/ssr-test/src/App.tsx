// App.tsx
import AppClient from "./App.client";
import AppServer from "./App.server";
import HomePage from "./Homepage";

const isServer = (url: string) => {
  return url.includes("server");
};

type AppProps = {
  url: string;
  initialData?: any;
  serverComponents?: Record<string, React.ReactNode>;
};

export default function App({ url, initialData, serverComponents }: AppProps) {
  if (typeof window === "undefined") {
    return isServer(url) ? (
      <AppServer
        initialData={initialData}
        serverComponents={serverComponents}
      />
    ) : (
      <HomePage />
    );
  } else {
    return isServer(url) ? (
      <AppServer
        initialData={initialData}
        serverComponents={serverComponents}
      />
    ) : (
      <AppClient />
    );
  }
}
