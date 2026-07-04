import days01to20 from './days/days01to20';
import days21to40 from './days/days21to40';
import days41to60 from './days/days41to60';

// Roadmap data indexed by day number
export const roadmapData = {
  ...days01to20,
  ...days21to40,
  ...days41to60,
};

// Roadmap overview for the 60-day timeline
export const roadmapOverview = [
  // Week 1: Java Foundations
  { day: 1, title: "Introduction to Java & Environment Setup", phase: "Java Fundamentals", week: 1 },
  { day: 2, title: "Variables, Data Types & Type Casting", phase: "Java Fundamentals", week: 1 },
  { day: 3, title: "Operators & Expressions", phase: "Java Fundamentals", week: 1 },
  { day: 4, title: "User Input & Scanner Class", phase: "Java Fundamentals", week: 1 },
  { day: 5, title: "Conditional Statements (if, else, switch)", phase: "Java Fundamentals", week: 1 },
  { day: 6, title: "Practice Day — Conditionals & Logic Building", phase: "Java Fundamentals", week: 1 },
  { day: 7, title: "Week 1 Revision & Mini Assessment", phase: "Java Fundamentals", week: 1 },

  // Week 2: Loops & Methods
  { day: 8, title: "While & Do-While Loops", phase: "Java Fundamentals", week: 2 },
  { day: 9, title: "For Loops & Nested Loops", phase: "Java Fundamentals", week: 2 },
  { day: 10, title: "Loop Patterns & Break/Continue", phase: "Java Fundamentals", week: 2 },
  { day: 11, title: "Methods — Declaration, Parameters, Return", phase: "Java Fundamentals", week: 2 },
  { day: 12, title: "Method Overloading & Scope", phase: "Java Fundamentals", week: 2 },
  { day: 13, title: "Practice Day — Loops & Methods", phase: "Java Fundamentals", week: 2 },
  { day: 14, title: "Week 2 Revision & Mini Project", phase: "Java Fundamentals", week: 2 },

  // Week 3: Arrays & Strings
  { day: 15, title: "1D Arrays — Declaration, Traversal, Operations", phase: "Arrays & Strings", week: 3 },
  { day: 16, title: "2D Arrays & Matrix Operations", phase: "Arrays & Strings", week: 3 },
  { day: 17, title: "Array Algorithms — Search, Sort Basics", phase: "Arrays & Strings", week: 3 },
  { day: 18, title: "Strings — Basics, Immutability, String Pool", phase: "Arrays & Strings", week: 3 },
  { day: 19, title: "String Methods & Comparison", phase: "Arrays & Strings", week: 3 },
  { day: 20, title: "StringBuilder & StringBuffer", phase: "Arrays & Strings", week: 3 },
  { day: 21, title: "Week 3 Revision & Assessment", phase: "Arrays & Strings", week: 3 },

  // Week 4: OOP Part 1
  { day: 22, title: "Classes & Objects", phase: "OOP", week: 4 },
  { day: 23, title: "Constructors & this Keyword", phase: "OOP", week: 4 },
  { day: 24, title: "Access Modifiers & Encapsulation", phase: "OOP", week: 4 },
  { day: 25, title: "Static Keyword & Final Keyword", phase: "OOP", week: 4 },
  { day: 26, title: "Inheritance & super Keyword", phase: "OOP", week: 4 },
  { day: 27, title: "Practice Day — OOP Fundamentals", phase: "OOP", week: 4 },
  { day: 28, title: "Week 4 Revision & Mini Project", phase: "OOP", week: 4 },

  // Week 5: OOP Part 2
  { day: 29, title: "Polymorphism — Overloading & Overriding", phase: "OOP", week: 5 },
  { day: 30, title: "Abstract Classes & Abstraction", phase: "OOP", week: 5 },
  { day: 31, title: "Interfaces", phase: "OOP", week: 5 },
  { day: 32, title: "Packages & Code Organization", phase: "OOP", week: 5 },
  { day: 33, title: "OOP Design Practice", phase: "OOP", week: 5 },
  { day: 34, title: "Practice Day — Full OOP", phase: "OOP", week: 5 },
  { day: 35, title: "Week 5 Revision & OOP Assessment", phase: "OOP", week: 5 },

  // Week 6: Exception Handling & File I/O
  { day: 36, title: "Exception Handling — try, catch, finally", phase: "Advanced Java", week: 6 },
  { day: 37, title: "Custom Exceptions & Throw/Throws", phase: "Advanced Java", week: 6 },
  { day: 38, title: "File Handling — Reading & Writing", phase: "Advanced Java", week: 6 },
  { day: 39, title: "Wrapper Classes & Autoboxing", phase: "Advanced Java", week: 6 },
  { day: 40, title: "Enums & Annotations", phase: "Advanced Java", week: 6 },
  { day: 41, title: "Practice Day — Exception Handling & Files", phase: "Advanced Java", week: 6 },
  { day: 42, title: "Week 6 Revision & Mini Project", phase: "Advanced Java", week: 6 },

  // Week 7: Collections Framework
  { day: 43, title: "Collections Overview & ArrayList", phase: "Collections", week: 7 },
  { day: 44, title: "LinkedList & List Interface", phase: "Collections", week: 7 },
  { day: 45, title: "HashSet, TreeSet & Set Interface", phase: "Collections", week: 7 },
  { day: 46, title: "HashMap & TreeMap", phase: "Collections", week: 7 },
  { day: 47, title: "Stack, Queue & Deque", phase: "Collections", week: 7 },
  { day: 48, title: "Comparable & Comparator", phase: "Collections", week: 7 },
  { day: 49, title: "Week 7 Revision & Collections Assessment", phase: "Collections", week: 7 },

  // Week 8: Modern Java & Advanced Topics
  { day: 50, title: "Generics", phase: "Modern Java", week: 8 },
  { day: 51, title: "Functional Interfaces & Lambda Expressions", phase: "Modern Java", week: 8 },
  { day: 52, title: "Stream API Basics", phase: "Modern Java", week: 8 },
  { day: 53, title: "Multithreading Basics", phase: "Modern Java", week: 8 },
  { day: 54, title: "Java Memory Model & Garbage Collection", phase: "Modern Java", week: 8 },
  { day: 55, title: "Debugging & Code Quality", phase: "Modern Java", week: 8 },
  { day: 56, title: "Week 8 Revision & Assessment", phase: "Modern Java", week: 8 },

  // Week 9: Integration & Interview Prep
  { day: 57, title: "JUnit Testing Basics", phase: "Interview Prep", week: 9 },
  { day: 58, title: "Git Basics for Java Projects", phase: "Interview Prep", week: 9 },
  { day: 59, title: "Java Interview Questions Marathon", phase: "Interview Prep", week: 9 },
  { day: 60, title: "Final Assessment & Capstone Project", phase: "Interview Prep", week: 9 },
];

export const phases = [
  { name: "Java Fundamentals", weeks: "1-2", days: "1-14", color: "brand" },
  { name: "Arrays & Strings", weeks: "3", days: "15-21", color: "emerald" },
  { name: "OOP", weeks: "4-5", days: "22-35", color: "violet" },
  { name: "Advanced Java", weeks: "6", days: "36-42", color: "amber" },
  { name: "Collections", weeks: "7", days: "43-49", color: "cyan" },
  { name: "Modern Java", weeks: "8", days: "50-56", color: "rose" },
  { name: "Interview Prep", weeks: "9", days: "57-60", color: "orange" },
];
