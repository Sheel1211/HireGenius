export const languageOptions = [
  {
    id: 43,
    name: "Plain Text",
    label: "Plain Text",
    value: "text",
    defaultCode: ``,
  },
  {
    id: 44,
    name: "Executable",
    label: "Executable",
    value: "exe",
    defaultCode: ``,
  },
  {
    id: 45,
    name: "Assembly (NASM 2.14.02)",
    label: "Assembly (NASM 2.14.02)",
    value: "assembly",
    defaultCode: `section .data
    hello db 'Hello, World!',0
    section .text
    global _start
    _start:
        ; write(1,hello,13)
        mov eax,4
        mov ebx,1
        mov ecx,hello
        mov edx,13
        int 0x80
        ; exit(0)
        mov eax,1
        mov ebx,0
        int 0x80`,
  },
  {
    id: 46,
    name: "Bash (5.0.0)",
    label: "Bash (5.0.0)",
    value: "bash",
    defaultCode: `#!/bin/bash
echo "Hello World"`,
  },
  {
    id: 47,
    name: "Basic (FBC 1.07.1)",
    label: "Basic (FBC 1.07.1)",
    value: "basic",
    defaultCode: `PRINT "Hello, World!"`,
  },
  {
    id: 48,
    name: "C (GCC 7.4.0)",
    label: "C (GCC 7.4.0)",
    value: "c",
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`,
  },
  {
    id: 49,
    name: "C (GCC 8.3.0)",
    label: "C (GCC 8.3.0)",
    value: "c",
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`,
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
    label: "C (GCC 9.2.0)",
    value: "c",
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`,
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
    defaultCode: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello World");
    }
}`,
  },
  {
    id: 52,
    name: "C++ (GCC 7.4.0)",
    label: "C++ (GCC 7.4.0)",
    value: "cpp",
    defaultCode: `#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}`,
  },
  {
    id: 53,
    name: "C++ (GCC 8.3.0)",
    label: "C++ (GCC 8.3.0)",
    value: "cpp",
    defaultCode: `#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}`,
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    label: "C++ (GCC 9.2.0)",
    value: "cpp",
    defaultCode: `#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}`,
  },
  {
    id: 55,
    name: "Common Lisp (SBCL 2.0.0)",
    label: "Common Lisp (SBCL 2.0.0)",
    value: "lisp",
    defaultCode: `(format t "Hello, World~%")`,
  },
  {
    id: 56,
    name: "D (DMD 2.089.1)",
    label: "D (DMD 2.089.1)",
    value: "d",
    defaultCode: `import std.stdio;

void main() {
    writeln("Hello World");
}`,
  },
  {
    id: 57,
    name: "Elixir (1.9.4)",
    label: "Elixir (1.9.4)",
    value: "elixir",
    defaultCode: `IO.puts "Hello World"`,
  },
  {
    id: 58,
    name: "Erlang (OTP 22.2)",
    label: "Erlang (OTP 22.2)",
    value: "erlang",
    defaultCode: `-module(helloworld).
-export([main/0]).

main() ->
    io:format("Hello, World!~n").`,
  },
  {
    id: 59,
    name: "Fortran (GFortran 9.2.0)",
    label: "Fortran (GFortran 9.2.0)",
    value: "fortran",
    defaultCode: `program HelloWorld
    print *, "Hello World"
end program HelloWorld`,
  },
  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go (1.13.5)",
    value: "go",
    defaultCode: `package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}`,
  },
  {
    id: 61,
    name: "Haskell (GHC 8.8.1)",
    label: "Haskell (GHC 8.8.1)",
    value: "haskell",
    defaultCode: `main = putStrLn "Hello, World!"`,
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
    defaultCode: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World
        System.out.println("Hello World");
      }
    }`
  },
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
    defaultCode: `console.log("Hello World");`
  },
  {
    id: 64,
    name: "Lua (5.3.5)",
    label: "Lua (5.3.5)",
    value: "lua",
    defaultCode: `print("Hello World")`
  },
  {
    id: 65,
    name: "OCaml (4.09.0)",
    label: "OCaml (4.09.0)",
    value: "ocaml",
    defaultCode: `print_endline "Hello World";;`
  },
  {
    id: 66,
    name: "Octave (5.1.0)",
    label: "Octave (5.1.0)",
    value: "octave",
    defaultCode: `disp("Hello World");`
  },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
    label: "Pascal (FPC 3.0.4)",
    value: "pascal",
    defaultCode: `program Hello;
begin
  writeln('Hello World');
end.`
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
    label: "PHP (7.4.1)",
    value: "php",
    defaultCode: `<?php
echo "Hello World";
?>`
  },
  {
    id: 69,
    name: "Prolog (GNU Prolog 1.4.5)",
    label: "Prolog (GNU Prolog 1.4.5)",
    value: "prolog",
    defaultCode: `main :- write('Hello World'), nl, halt.`
  },
  {
    id: 70,
    name: "Python (2.7.17)",
    label: "Python (2.7.17)",
    value: "python",
    defaultCode: `print("Hello World")`
  },
  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python",
    defaultCode: `print("Hello World")`
  },
  {
    id: 72,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
    defaultCode: `cat("Hello World\n")`
  },
  {
    id: 73,
    name: "Ruby (2.7.0)",
    label: "Ruby (2.7.0)",
    value: "ruby",
    defaultCode: `puts "Hello World"`
  },
  {
    id: 74,
    name: "Rust (1.40.0)",
    label: "Rust (1.40.0)",
    value: "rust",
    defaultCode: `fn main() {
    println!("Hello World");
}`
  },
  {
    id: 75,
    name: "C (Clang 7.0.1)",
    label: "C (Clang 7.0.1)",
    value: "c",
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`
  },
  {
    id: 76,
    name: "C++ (Clang 7.0.1)",
    label: "C++ (Clang 7.0.1)",
    value: "cpp",
    defaultCode: `#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}`
  },
  {
    id: 77,
    name: "COBOL (GnuCOBOL 2.2)",
    label: "COBOL (GnuCOBOL 2.2)",
    value: "cobol",
    defaultCode: `IDENTIFICATION DIVISION.
PROGRAM-ID. HelloWorld.
PROCEDURE DIVISION.
   DISPLAY 'Hello World'.
   STOP RUN.`
  },
  {
    id: 78,
    name: "Kotlin (1.3.70)",
    label: "Kotlin (1.3.70)",
    value: "kotlin",
    defaultCode: `fun main() {
    println("Hello World")
}`
  },
  {
    id: 79,
    name: "Objective-C (Clang 7.0.1)",
    label: "Objective-C (Clang 7.0.1)",
    value: "objectivec",
    defaultCode: `#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello World");
    }
    return 0;
}`
  },
  {
    id: 80,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
    defaultCode: `cat("Hello World\\n")`
  },
  {
    id: 81,
    name: "Scala (2.13.2)",
    label: "Scala (2.13.2)",
    value: "scala",
    defaultCode: `object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello World")
  }
}`
  },
  {
    id: 82,
    name: "SQL (SQLite 3.27.2)",
    label: "SQL (SQLite 3.27.2)",
    value: "sql",
    defaultCode: `SELECT 'Hello World';`
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
    label: "Swift (5.2.3)",
    value: "swift",
    defaultCode: `import Swift

print("Hello World")`
  },
  {
    id: 84,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
    label: "Visual Basic.Net (vbnc 0.0.0.5943)",
    value: "vbnet",
    defaultCode: `Module HelloWorld
    Sub Main()
        Console.WriteLine("Hello World")
    End Sub
End Module`
  },
  {
    id: 85,
    name: "Perl (5.28.1)",
    label: "Perl (5.28.1)",
    value: "perl",
    defaultCode: `print "Hello World\\n";`
  },
  {
    id: 86,
    name: "Clojure (1.10.1)",
    label: "Clojure (1.10.1)",
    value: "clojure",
    defaultCode: `(println "Hello World")`
  },
  {
    id: 87,
    name: "F# (.NET Core SDK 3.1.202)",
    label: "F# (.NET Core SDK 3.1.202)",
    value: "fsharp",
    defaultCode: `open System

[<EntryPoint>]
let main argv =
    printfn "Hello World"
    0 // return an integer exit code`,
  },
  {
    id: 88,
    name: "Groovy (3.0.3)",
    label: "Groovy (3.0.3)",
    value: "groovy",
    defaultCode: `class HelloWorld {
    static void main(String[] args) {
        println("Hello World")
    }
}`,
  },
];