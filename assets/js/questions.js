// Start with an array of question objects. 11 questions, with the intention of displaying 10 at random to the user.

const quizQuestions = [
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: ["Character", "Number", "Boolean", "Null"],
    answerIndex: 0,
  },
  {
    question: "We write internal JavaScript code directly into which HTML element?",
    options: ["<html>", "<header>", "<script>", "<footer>"],
    answerIndex: 2,
  },
  {
    question: "Which of these array methods adds an element to the beginning of an array?",
    options: [".push()", ".pop()", ".unshift()", ".shift()"],
    answerIndex: 2,
  },
  {
    question: "What is the short form way of representing the equation 'x = x + 1'",
    options: ["x--", "x-=", "x+=", "x++"],
    answerIndex: 3,
  },
  {
    question: "Which of these is used to store code blocks for use at the developer's convenience?",
    options: ["Variable", "Array", "Function", "Object"],
    answerIndex: 2,
  },
  {
    question: "What is the DOM?",
    options: [
      "Dominant Object Memory",
      "Document Object Model",
      "Disc Operating Memory",
      "Developer Object Model",
    ],
    answerIndex: 1,
  },
  {
    question: "When querying the DOM, how would you access or reference an element with the id 'container'?",
    options: ["#container", ".container", "<container>", "[container]"],
    answerIndex: 0,
  },
  {
    question: "What word means to join multiple strings or arrays together?",
    options: ["combination", "concatenation", "connection", "correlation"],
    answerIndex: 1,
  },
  {
    question: "The DOM describes an HTML page by considering its elements as a hierarchy of what?",
    options: ["tags", "milestones", "nodes", "arrays"],
    answerIndex: 2,
  },
  {
    question: "Which of these is characterised by key-value pairs?",
    options: ["selector", "variable", "array", "object"],
    answerIndex: 3,
  },
  {
    question: "Which data type only has two possible outcomes?",
    options: ["Number", "String", "Conditional", "Boolean"],
    answerIndex: 3,
  },
];
