import { Container, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Question from "./Question";
import { Buffer } from "buffer";
import EditorContainer from "./EditorContainer";
import axios from "axios";
export const languageMap = {
  cpp: {
    id: 54,
    defaultCode:
      "#include <iostream>\n" +
      "using namespace std;\n\n" +
      "int main() {\n" +
      '\tcout << "Hello World!";\n' +
      "\treturn 0;\n" +
      "}",
  },
  java: {
    id: 62,
    defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
    }`,
  },
  python: {
    id: 71,
    defaultCode: `print("Hello World!")`,
  },
  javascript: {
    id: 63,
    defaultCode: `console.log("Hello World!");`,
  },
  c: {
    id: 50,
    defaultCode:
      "#include <stdio.h>\n" +
      "int main() {\n" +
      '\tprintf("Hello World!");\n' +
      "\treturn 0;\n" +
      "}",
  },
};
const Playground = () => {
  const language = "cpp";
  const code =
    "#include <iostream>\n" +
    "using namespace std;\n\n" +
    "int main() {\n" +
    '\tcout << "Hello World!";\n' +
    "\treturn 0;\n" +
    "}";

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput, setCurrentInput] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64");
  };

  const decode = (str) => {
    return Buffer.from(str, "base64").toString();
  };

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "a77dcef814mshdad0f602ecd8767p1b6a1djsnd2c8bfa00c1a",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
      }),
    };

    const res = await axios.request(options);
    return res.data.token;
  };

  const getOutput = async (token) => {
    // we will make api call here
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "a77dcef814mshdad0f602ecd8767p1b6a1djsnd2c8bfa00c1a",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    // call the api
    const res = await axios.request(options);

    if (res.data.status_id <= 2) {
      const res2 = await getOutput(token);
      console.log(res.data);
      return res2.data;
    }
    // console.log(res);
    return res.data;
  };

  const runCode = async () => {
    console.log("I m");
    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    console.log(currentInput);
    // pass these things to Create Submissions
    const token = await postSubmission(language_id, source_code, stdin);

    // get the output
    const res = await getOutput(token);
    const status_name = res.status.description;
    const decoded_output = decode(res.stdout ? res.stdout : "");
    const decoded_compile_output = decode(
      res.compile_output ? res.compile_output : ""
    );
    const decoded_error = decode(res.stderr ? res.stderr : "");

    let final_output = "";
    if (res.status_id !== 3) {
      // our code have some error
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      } else {
        final_output = decoded_compile_output;
      }
    } else {
      final_output = decoded_output;
    }
    setCurrentOutput(status_name + "\n\n" + final_output);
  };

  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content);
      })
      .catch((error) => console.log(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
  return (
    <React.Fragment>
      {/* <Header /> */}
      <CssBaseline />
      <Container
        sx={{
          minWidth: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2vmax",
        }}
        fixed
        disableGutters={true}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Question />
          </Grid>
          <Grid item xs={7}>
            <EditorContainer
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
              currentCode={currentCode}
              setCurrentCode={setCurrentCode}
              runCode={runCode}
              getFile={getFile}
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              currentOutput={currentOutput}
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
            />
            {/* <Landing /> */}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Playground;
