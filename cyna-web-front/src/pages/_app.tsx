import "../styles/globals.css"; // Ensure this file imports Tailwind CSS
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
