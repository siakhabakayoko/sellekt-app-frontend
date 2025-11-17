declare module "react" {
    interface CSSProperties {
      [key: `@media (max-width: ${string}px)`]: CSSProperties;
    }
  }