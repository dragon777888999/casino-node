import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ParentGam } from "./pages/Gambol/ParentGam";
import { ParentCS } from "./pages/Craftystake/ParentCS";
import { ParentRoo } from "./pages/Roogsino/ParentRoo";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/gam" element={<ParentGam />} />
          <Route path="/con" element={<ParentCS />} />
          <Route path="/roo" element={<ParentRoo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
