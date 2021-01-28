export const useBeforeLeave = (onBefore) => {
  const handling = () => {
    onBefore();
  };

  useEffect(() => {
    document.addEventListener("mouseleave", handling);
    return () => document.removeEventListener("mouseleave", handling);
  }, []);

  if (typeof onBefore !== "function") {
    return;
  }
};
