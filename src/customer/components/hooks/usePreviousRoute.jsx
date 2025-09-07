import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function usePreviousRoute() {
  const location = useLocation();
  const prevLocation = useRef(null);

  useEffect(() => {
    // Store the current location before it changes
    prevLocation.current = location;
  }, [location]);

  return prevLocation.current;
}
