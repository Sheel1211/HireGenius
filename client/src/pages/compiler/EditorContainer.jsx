import { Box, Container } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
// import { Grid } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import { Button, Divider, Typography } from "@mui/material";

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

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};


const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen,
  currentOutput,
  setCurrentInput,
  currentInput,
  
}) => {
  const themeOptions = [
    { value: "githubDark", label: "githubDark" },
    { value: "githubLight", label: "githubLight" },
    { value: "bespin", label: "bespin" },
    { value: "duotoneDark", label: "duotoneDark" },
    { value: "duotoneLight", label: "duotoneLight" },
    { value: "dracula", label: "dracula" },
    { value: "xcodeDark", label: "xcodeDark" },
    { value: "xcodeLight", label: "xcodeLight" },
    { value: "vscodeDark", label: "vscodeDark" },
    { value: "vscodeLight", label: "vscodeLight" },
    { value: "okaidia", label: "okaidia" },
  ];

  const languageOptions = [
    { value: "cpp", label: "cpp" },
    { value: "c", label: "c" },
    { value: "javascript", label: "javascript" },
    { value: "java", label: "java" },
    { value: "python", label: "python" },
  ];

  const handleThemeChange = (selectedOption) => {
    // theme=selectedOption.target.value
    setCurrentTheme(selectedOption.target.value);
  };

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption.target.value);
    setCurrentLanguage(selectedOption.target.value);
    setCurrentCode(languageMap[selectedOption.target.value].defaultCode);
    console.log(selectedOption.target.value);
  };

  const [currentTheme, setCurrentTheme] = useState({
    value: "githubDark",
    label: "githubDark",
  });

  
  const [language, setLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage) {
        return languageOptions[i];
      }
    }
    return languageOptions[0];
  });
  return (
    <React.Fragment>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          Width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingRight: "1vmax",
            overflow: "hidden",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={currentLanguage}
              onChange={handleLanguageChange}
              autoWidth
              label="Language"
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Theme
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={currentTheme}
              onChange={handleThemeChange}
              autoWidth
              label="Theme"
            >
              {themeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Container
          sx={{
            Height: "100vh",
            minWidth: "100%",
          }}
          border={2}
        >
          <CodeEditor
            currentLanguage={currentLanguage}
            currentTheme={currentTheme}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: "2vmax",
            }}
          >
            <Button variant="contained" onClick={runCode}>Run Code</Button>
            <Button variant="contained" color="success">
              Submit Code
            </Button>
          </Box>
          <Divider />
        </Container>

        <Container>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Container>
                <Typography variant="h5">INPUT:</Typography>
                <StyledTextarea
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Enter Test Cases"
                  onChange={(e)=>{setCurrentInput(e.target.value)}}
                />
              </Container>
            </Grid>
            <Grid xs={6}>
            <Container>
                <Typography variant="h5">OUTPUT:</Typography>
                <StyledTextarea
                  aria-label="minimum height"
                  minRows={3}
                  placeholder={currentOutput}
                  disabled
                  
                />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default EditorContainer;
