/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const CodeEditor = ({
    currentLanguage,
    currentTheme,
    currentCode,
    setCurrentCode
}) => {

    const [theme, setTheme] = useState(githubDark)
    const [language, setLanguage] = useState(cpp);

    useEffect(() => {
        if (currentLanguage === 'cpp') setLanguage(cpp);
        if (currentLanguage === 'java') setLanguage(java);
        if (currentLanguage === 'javascript') setLanguage(javascript);
        if (currentLanguage === 'python') setLanguage(python);
    }, [currentLanguage])


    useEffect(() => {
        if (currentTheme === 'githubDark') setTheme(githubDark);
        if (currentTheme === 'githubLight') setTheme(githubLight);
        if (currentTheme === 'bespin') setTheme(bespin);
        if (currentTheme === 'duotoneDark') setTheme(duotoneDark);
        if (currentTheme === 'duotoneLight') setTheme(duotoneLight);
        if (currentTheme === 'dracula') setTheme(dracula);
        if (currentTheme === 'xcodeDark') setTheme(xcodeDark);
        if (currentTheme === 'xcodeLight') setTheme(xcodeLight);
        if (currentTheme === 'vscodeDark') setTheme(vscodeDark);
        if (currentTheme === 'okaidia') setTheme(okaidia);
    }, [currentTheme])

    return (
        <CodeMirror
            value={currentCode}
            height="60vh"
            theme={theme}
            extensions={[
                language,
                indentUnit.of("        "),
                EditorState.tabSize.of(8),
                EditorState.changeFilter.of(() => true)
            ]}
            onChange={(value) => setCurrentCode(value)}
            basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true,
            }}
        />
    )
}

export default CodeEditor