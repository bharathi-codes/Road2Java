const day01 = {
  dayNumber: 1,
  title: "Introduction to Java, Environment Setup & Your First Program",
  phase: "Java Fundamentals",
  estimatedTime: { learning: "1.5 hours", coding: "1.5 hours", practice: "1 hour", revision: "0.5 hours" },
  learningGoal: "Understand what Java is, set up your development environment, write and run your first programs, and deeply understand the compilation process and main method anatomy.",

  topics: [
    "What is Java and why it dominates placements",
    "History of Java (interview-relevant points)",
    "Features of Java — platform independence, OOP, robustness, security",
    "JDK vs JRE vs JVM — what each one does",
    "How Java code is compiled and executed",
    "Installing JDK and setting up environment variables",
    "Choosing an editor/IDE",
    "Writing your first Java program",
    "Anatomy of public static void main(String[] args)",
    "System.out.println() vs print() vs printf()",
    "Comments — single-line, multi-line, Javadoc",
    "Escape sequences",
    "Compilation and execution commands (javac, java)",
    "Common Day 1 errors and how to fix them",
  ],

  theory: [
    {
      id: "what-is-java",
      title: "What is Java?",
      content: `Java is a **high-level, object-oriented, platform-independent** programming language created by **James Gosling** at **Sun Microsystems** in **1995**. It is now owned by **Oracle Corporation**.

**Why Java matters for placements:**
- Java is the **#1 language in Indian placement drives** across service and product companies.
- TCS, Infosys, Wipro, Cognizant — all test Java or allow Java as a choice.
- Amazon, Microsoft, Adobe, Goldman Sachs — all accept Java in coding rounds.
- Android development, backend systems, enterprise software, banking systems — all use Java.

**Interview tip:** If asked "Why Java?", say: *"Java is platform-independent because of the JVM, has strong memory management via garbage collection, enforces OOP design for maintainable code, and has a massive ecosystem of enterprise libraries and frameworks."*`,
    },
    {
      id: "features-of-java",
      title: "Key Features of Java",
      content: `| Feature | Meaning | Interview Relevance |
|---|---|---|
| **Platform Independent** | Write once, run anywhere via bytecode + JVM | #1 most asked feature |
| **Object-Oriented** | Everything built around classes & objects | Backbone of every Java interview |
| **Robust** | Strong type-checking, exception handling, GC | Companies want crash-resistant code |
| **Secure** | No explicit pointers, bytecode verification | Banking/fintech companies love this |
| **Multithreaded** | Built-in concurrent execution support | Asked in Amazon, Flipkart, Adobe |
| **Simple** | No pointers, no operator overloading, no multiple class inheritance | Easier than C++ |`,
    },
    {
      id: "jdk-jre-jvm",
      title: "JDK vs JRE vs JVM — The Most Asked Interview Question",
      content: `This is asked in **90% of fresher interviews**. Understand it deeply.

**JVM (Java Virtual Machine)**
- An abstract machine that reads bytecode (.class files) and converts to machine code.
- JVM is **platform-dependent** (different JVM for Windows, Mac, Linux).
- But your **bytecode is platform-independent** — that's the magic.

**JRE (Java Runtime Environment)**
- JRE = JVM + standard libraries (rt.jar, etc.)
- Only needed to **run** Java programs. No compiler included.

**JDK (Java Development Kit)**
- JDK = JRE + development tools (javac compiler, jdb debugger, javadoc, etc.)
- **This is what you install** on your machine.

**Interview question:** *"Can you run a Java program with just the JVM?"*
**Answer:** No. You need the JRE which includes the JVM plus required class libraries.`,
    },
    {
      id: "compilation-flow",
      title: "How Java Code is Compiled and Executed",
      content: `**The flow:**
\`YourCode.java → javac (compiler) → YourCode.class (bytecode) → JVM → Output\`

1. You write code in a \`.java\` file (source code, human-readable).
2. \`javac\` compiles it into a \`.class\` file (bytecode, not human-readable).
3. The JVM reads the \`.class\` file.
4. Inside the JVM: **Class Loader** loads bytecode → **Bytecode Verifier** checks safety → **JIT Compiler** converts to machine code → execution.

**Why bytecode instead of direct machine code?**
Machine code differs per OS. Bytecode is universal — any JVM on any OS can run it. This is "Write Once, Run Anywhere."`,
    },
    {
      id: "main-method",
      title: "Anatomy of the Main Method",
      content: `Every word has a purpose:

| Keyword | Meaning | Why It's There |
|---|---|---|
| \`public\` | Access modifier — anyone can access | JVM must call it from outside the class |
| \`static\` | Belongs to the class, not an object | JVM calls main() without creating an object |
| \`void\` | Returns nothing | main() doesn't return a value to the JVM |
| \`main\` | Method name | JVM specifically looks for this name as entry point |
| \`String[] args\` | Array of strings | Command-line arguments passed when running |

**Interview questions:**
- *"Can you write \`static public void main\`?"* — Yes! Order of public/static doesn't matter.
- *"Can we overload main?"* — Yes, but JVM only calls the \`String[] args\` version.
- *"Can we run Java without main?"* — Not since Java 7. Before that, static blocks worked.`,
    },
    {
      id: "print-statements",
      title: "Print Statements — println vs print vs printf",
      content: `**\`System.out.println()\`** — Prints and moves to the next line.
**\`System.out.print()\`** — Prints and stays on the same line.
**\`System.out.printf()\`** — Formatted printing (like C's printf).

**Key format specifiers for printf:**
| Specifier | Type | Example |
|---|---|---|
| \`%s\` | String | \`"Hello"\` |
| \`%d\` | Integer | \`42\` |
| \`%f\` | Float | \`3.14\` |
| \`%.2f\` | Float (2 decimals) | \`3.14\` |
| \`%n\` | New line | — |
| \`%c\` | Character | \`'A'\` |`,
    },
    {
      id: "comments",
      title: "Comments in Java",
      content: `**Single-line:** \`// comment\`
**Multi-line:** \`/* comment */\`
**Javadoc:** \`/** documentation comment */\`

- Use \`//\` for quick notes while coding.
- Use \`/* */\` for disabling code blocks or longer explanations.
- Use \`/** */\` for documenting classes/methods professionally. Companies like Amazon and Microsoft expect proper documentation.`,
    },
    {
      id: "escape-sequences",
      title: "Escape Sequences",
      content: `| Sequence | Meaning |
|---|---|
| \`\\n\` | New line |
| \`\\t\` | Tab |
| \`\\\\\` | Backslash |
| \`\\"\` | Double quote inside string |
| \`\\'\` | Single quote |
| \`\\r\` | Carriage return |`,
    },
  ],

  codeExamples: [
    {
      id: "hello-world",
      title: "Your First Java Program",
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      explanation: "The simplest Java program. The class name must match the file name. main() is the entry point.",
    },
    {
      id: "print-demo",
      title: "println vs print vs printf",
      code: `public class PrintDemo {
    public static void main(String[] args) {
        // println — prints and moves to next line
        System.out.println("Hello");
        System.out.println("World");

        // print — stays on same line
        System.out.print("Hello ");
        System.out.print("World");
        System.out.println(); // move to next line

        // printf — formatted output
        String name = "Rahul";
        int age = 21;
        System.out.printf("My name is %s and I am %d years old.%n", name, age);
    }
}`,
      explanation: "Demonstrates all three output methods. printf uses format specifiers like %s for strings and %d for integers.",
    },
    {
      id: "escape-demo",
      title: "Escape Sequences in Action",
      code: `public class EscapeDemo {
    public static void main(String[] args) {
        System.out.println("Line 1\\nLine 2\\nLine 3");
        System.out.println("Name\\tAge\\tCity");
        System.out.println("Amit\\t21\\tDelhi");
        System.out.println("She said \\"Hello\\"");
        System.out.println("Path: C:\\\\Users\\\\Java");
    }
}`,
      explanation: "\\n creates new lines, \\t creates tabs, \\\" prints quotes inside strings, \\\\ prints a backslash.",
    },
    {
      id: "command-args",
      title: "Command-Line Arguments",
      code: `public class GreetUser {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("Hello, " + args[0] + "! Welcome to Java.");
        } else {
            System.out.println("Hello, Stranger! Pass your name as an argument.");
        }
    }
}`,
      explanation: "Run as: java GreetUser YourName. args[0] captures the first argument.",
    },
  ],

  practiceProblems: [
    { id: "p1", difficulty: "very-easy", title: "Print Your Name", description: "Write a program that prints your full name." },
    { id: "p2", difficulty: "very-easy", title: "College Info", description: "Print your college name on one line and your branch on the next line." },
    { id: "p3", difficulty: "very-easy", title: "Three Lines with print()", description: "Print three lines using only System.out.print() and \\n for new lines." },
    { id: "p4", difficulty: "easy", title: "Star Box", description: "Print a box made of * symbols:\n*****\n*   *\n*   *\n*****" },
    { id: "p5", difficulty: "easy", title: "Bio Card", description: "Print a formatted bio card with borders using + - and | symbols. Include name, branch, year, and goal." },
    { id: "p6", difficulty: "easy", title: "Student Table", description: "Use \\t to print a formatted table of 3 students with Name, Age, and CGPA." },
    { id: "p7", difficulty: "medium", title: "Star Triangle", description: "Print this pattern using only println:\n*\n**\n***\n****\n*****" },
    { id: "p8", difficulty: "medium", title: "Mixed Printing", description: "Print: Java is fun.Java is powerful.\\nJava is everywhere.\\n(First two on same line, third on next line. Use mix of print and println)" },
    { id: "p9", difficulty: "medium", title: "printf Variables", description: "Use printf to print: 'I will study Java for X hours every day for Y days.' where X=5 and Y=60 are stored in int variables." },
    { id: "p10", difficulty: "challenging", title: "Welcome Dashboard", description: "Take your name as a command-line argument and print a formatted welcome dashboard with borders, day number, and status." },
    { id: "p11", difficulty: "challenging", title: "All-in-One Demo", description: "Write a single program demonstrating println, print, printf, single-line and multi-line comments, and 3+ escape sequences with a tabbed table." },
    { id: "p12", difficulty: "challenging", title: "Output Prediction", description: "Predict the output of: System.out.print(\"A\"); System.out.println(\"B\"); System.out.print(\"C\"); System.out.print(\"D\"); System.out.println(); System.out.println(\"E\"); — Then verify by running it." },
    { id: "p13", difficulty: "medium", title: "Invitation Card", description: "Print a nicely formatted invitation card for a college tech fest with event name, date, venue, and decorative borders." },
    { id: "p14", difficulty: "challenging", title: "Shopping Receipt", description: "Print a receipt with store name, 4 items (name, qty, price using \\t alignment), and total using printf for 2 decimal prices." },
    { id: "p15", difficulty: "medium", title: "ASCII Art Initial", description: "Print your first initial as ASCII art using * symbols (e.g., the letter A)." },
  ],

  selfAssessment: [
    {
      id: "q1",
      type: "conceptual",
      question: "Java is platform-independent, but the JVM is platform-dependent. Explain why this is not a contradiction.",
      answer: "Java source code compiles to bytecode, which is platform-independent. The JVM, which IS platform-dependent (different for each OS), reads this universal bytecode and converts it to OS-specific machine code. So the developer writes once, and the platform-specific JVM handles the rest.",
    },
    {
      id: "q2",
      type: "conceptual",
      question: "Why does the main method need to be static?",
      answer: "The JVM calls main() without creating an object of the class. Static methods can be called without an object, so main must be static for the JVM to invoke it as the program entry point.",
    },
    {
      id: "q3",
      type: "conceptual",
      question: "What would happen if you name your file helloworld.java but the class is named HelloWorld?",
      answer: "It won't compile. The filename must exactly match the public class name, including capitalization. Java is case-sensitive.",
    },
    {
      id: "q4",
      type: "output",
      question: "What is the output?\n\nSystem.out.println(\"5 + 3\");\nSystem.out.println(5 + 3);",
      answer: "5 + 3\n8\n\nFirst line prints the string literal. Second line evaluates the expression and prints the result.",
    },
    {
      id: "q5",
      type: "output",
      question: "What is the output?\n\nSystem.out.println(\"Result: \" + 5 + 3);\nSystem.out.println(\"Result: \" + (5 + 3));",
      answer: "Result: 53\nResult: 8\n\nIn the first line, left-to-right evaluation: \"Result: \" + 5 = \"Result: 5\", then + 3 = \"Result: 53\" (string concatenation). In the second line, parentheses force 5+3=8 first, then concatenation.",
    },
    {
      id: "q6",
      type: "debugging",
      question: "This code has 4 errors. Find them all:\n\npublic class Debug1 {\n    public Static void main(string[] args) {\n        system.out.println(\"I am learning Java!\")\n    }\n}",
      answer: "1. 'Static' should be 'static' (lowercase)\n2. 'string' should be 'String' (uppercase S — it's a class)\n3. 'system' should be 'System' (uppercase S — it's a class)\n4. Missing semicolon after the println statement",
    },
    {
      id: "q7",
      type: "debugging",
      question: "This code won't compile. Why?\n\nSystem.out.println('Hello World');",
      answer: "Single quotes are for char literals (single characters) like 'A'. For strings, you must use double quotes: \"Hello World\".",
    },
    {
      id: "q8",
      type: "output",
      question: "What is the output?\n\nSystem.out.println(\"Score: \" + 90 + 10);",
      answer: "Score: 9010\n\nLeft-to-right: \"Score: \" + 90 = \"Score: 90\" (string concat), then + 10 = \"Score: 9010\". To get Score: 100, use parentheses: \"Score: \" + (90 + 10).",
    },
  ],

  commonMistakes: [
    { mistake: "File name doesn't match class name", fix: "File name MUST exactly match the public class name, including case." },
    { mistake: "Forgetting semicolons", fix: "Every statement in Java ends with a semicolon (;)." },
    { mistake: "Using System.out.Println (capital P)", fix: "It's println — all lowercase. Java is case-sensitive." },
    { mistake: "Using single quotes for strings 'hello'", fix: "Single quotes for char ('A'), double quotes for String (\"hello\")." },
    { mistake: "Not closing curly braces {}", fix: "Always type both { and } first, then write code inside." },
    { mistake: "Writing string[] instead of String[]", fix: "String is a class name — always capitalize it." },
    { mistake: "Running java HelloWorld.class", fix: "Run as java HelloWorld (no .class extension)." },
    { mistake: "Not saving before compiling", fix: "Always save (Ctrl+S) before running javac." },
  ],

  bestPractices: [
    "Name classes meaningfully: StudentGradeCalculator, not Test1 or Demo.",
    "One public class per file. File name must match.",
    "Indent with 4 spaces per level — this is the Java convention.",
    "Comment WHY, not WHAT. Don't write '// prints hello' next to println(\"hello\").",
    "Use printf() for formatted output instead of awkward string concatenation.",
    "Start building clean code habits from Day 1. Amazon and Microsoft evaluate readability.",
  ],

  resources: [
    { title: "Java Tutorial for Beginners — Mosh", url: "https://www.youtube.com/watch?v=eIrMbAQSU34", type: "video" },
    { title: "Java by Kunal Kushwaha", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ", type: "video" },
    { title: "W3Schools Java", url: "https://www.w3schools.com/java/", type: "docs" },
    { title: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/", type: "docs" },
    { title: "HackerRank Java", url: "https://www.hackerrank.com/domains/java", type: "practice" },
  ],

  checklist: [
    { id: "c1", text: "JDK installed and java -version works" },
    { id: "c2", text: "Can explain JDK vs JRE vs JVM without notes" },
    { id: "c3", text: "Can explain every word in public static void main(String[] args)" },
    { id: "c4", text: "Understand compilation flow: .java → javac → .class → JVM → output" },
    { id: "c5", text: "Written, compiled, and run at least 5 Java programs" },
    { id: "c6", text: "Completed all Very Easy and Easy practice tasks" },
    { id: "c7", text: "Completed at least 2 Medium practice tasks" },
    { id: "c8", text: "Attempted at least 1 Challenging task" },
    { id: "c9", text: "Can answer all Self-Test questions from memory" },
    { id: "c10", text: "Got all Output Prediction questions correct" },
    { id: "c11", text: "Found all 4 errors in the Debug problem" },
    { id: "c12", text: "Read through Common Mistakes table" },
    { id: "c13", text: "Spent at least 4 hours on today's material" },
  ],

  placementRelevance: {
    service: "TCS NQT and Infosys InfyTQ both test JDK/JRE/JVM and basic output prediction. Wipro NLTH and Cognizant GenC ask MCQs on Java fundamentals — today's topics are directly tested. Getting these basics right = guaranteed easy marks.",
    product: "Product companies won't directly ask 'What is JDK?' but your understanding of how Java works helps you debug faster during coding rounds. Zoho asks very basic Java programs in Round 1. Goldman Sachs and JPMorgan want candidates who understand the engineering behind languages.",
  },

  nextDayPreview: "Day 2: Variables, Data Types, and Type Casting — the building blocks of every Java program.",
};

export default day01;
