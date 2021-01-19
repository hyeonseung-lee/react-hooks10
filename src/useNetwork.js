import { useState, useEffect } from "react";

export const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  console.log(status);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    //() => {
    //  window.removeEventListener("online", handleChange);
    //  window.removeEventListener("offline", handleChange);
    //}; it does not work....
  }, []);
  return status;
};
