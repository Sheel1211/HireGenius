import { Box, Container } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./components/CodeEditorWindow";
import axios from "axios";
import { classnames } from "./utils/general";
import { languageOptions } from "./constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "./lib/defineTheme";
import useKeyPress from "./hooks/useKeyPress";
import OutputWindow from "./components/OutputWindow";
import CustomInput from "./components/CustomInput";
import OutputDetails from "./components/OutputDetails";
import ThemeDropdown from "./components/ThemeDropdown";
import LanguagesDropdown from "./components/LanguagesDropdown";

let REACT_APP_RAPID_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
let REACT_APP_RAPID_API_HOST = "judge0-ce.p.rapidapi.com";
let REACT_APP_RAPID_API_KEY =
  "a77dcef814mshdad0f602ecd8767p1b6a1djsnd2c8bfa00c1a";

const javascriptDefault = `console.log("Hello World");`;

const EditorContainer = () => {
  //20 for starting with javascript
  const [code, setCode] = useState(languageOptions[20].defaultCode);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[20]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const onSelectChange = (sl) => {
    // console.log("selected Option...", sl);
    setLanguage(sl);
    setCode(sl.defaultCode);
    // console.log("code after "+code);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Container sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ paddingX: 4, paddingY: 2 }}>
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </Box>
        <Box sx={{ paddingX: 4, paddingY: 2 }}>
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </Box>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          paddingX: 4,
          paddingY: 4,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </Box>

        <Box
          sx={{
            flex: "1 0 30%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingX: 4,
            paddingY: 4,
            gap: 1,
          }}
        >
          <OutputWindow outputDetails={outputDetails} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: 4,
            paddingY: 2,
          }}
        >
          <Button
            onClick={handleCompile}
            disabled={!code}
            className={classnames(
              "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
              !code ? "opacity-50" : ""
            )}
          >
            {processing ? "Processing..." : "Compile and Execute"}
          </Button>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </Box>
      </Container>
    </>
  );
};

export default EditorContainer;
