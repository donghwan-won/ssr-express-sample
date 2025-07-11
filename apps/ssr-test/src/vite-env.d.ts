/// <reference types="vite/client" />

// Module Federation remote apps type declarations
declare module "remoteApp/Button" {
  const Button: React.ComponentType;
  export default Button;
}

declare module "remoteApp2/Button" {
  const Button: React.ComponentType;
  export default Button;
}
