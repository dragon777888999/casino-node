import { useMemo } from "react";
import dynamic from "next/dynamic";

const AppRouter = dynamic(() => import("./AppRouter"), { ssr: false });
function App() {
  return <AppRouter />;
}

export default App;
