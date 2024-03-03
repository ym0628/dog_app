import { useEffect } from "react";

export const useBgBeige = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "beige";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, []);
};
