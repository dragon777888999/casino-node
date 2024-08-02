import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/style.css";
// import "../components/wallet/wallet.css";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
