import React, { useEffect } from "react";

const PreventReload = () => {
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ""; // This will show a confirmation dialog with an empty message
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return <></>;
};

export default PreventReload;
