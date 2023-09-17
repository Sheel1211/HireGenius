import React, { useEffect } from "react";

const PreventKeys = () => {
  const handleKeyDown = (event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }

    if (event.key === "F12" || event.key === "ContextMenu") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <></>;
};

export default PreventKeys;
