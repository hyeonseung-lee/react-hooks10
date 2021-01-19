export const useConfirm = (message = "", onCallback, onCancel) => {
  if (!onCallback || typeof onCallback !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onCallback();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};
