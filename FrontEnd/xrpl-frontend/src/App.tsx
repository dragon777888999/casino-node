import { useMemo } from "react";
import dynamic from "next/dynamic";
const XRPLClient = dynamic(
  () => import("@nice-xrpl/react-xrpl").then((mod) => mod.XRPLClient),
  { ssr: false }
);

const AppRouter = dynamic(() => import("./AppRouter"), { ssr: false });
function App() {
  return (
    <XRPLClient>
      <AppRouter />
    </XRPLClient>
  );
}

export default App;
