import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const useIsDemoModeActive = () => {
  const demoMode = useSelector((state) => state.mainRememberReducer.currentPool);
  const location = useLocation();

  return useMemo(() => {
    return demoMode?.uid?.includes('demo') || location.pathname.includes("demo");
  }, [demoMode, location.pathname]);
};

export default useIsDemoModeActive;
