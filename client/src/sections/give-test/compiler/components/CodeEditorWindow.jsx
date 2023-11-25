import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
import { Container } from "@mui/material";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  useEffect(() => {
    setValue(code || "");
  }, [code]);

  return (
    <Container
      sx={{
        borderRadius: "md",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        boxShadow: "4xl",
      }}
    >
      <Editor
        height="85vh"
        width={`100%`}  
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </Container>
  );
};
export default CodeEditorWindow;
