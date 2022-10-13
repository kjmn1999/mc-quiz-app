import "./App.css";
import { shuffle } from "lodash";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { useState } from "react";

const quizQuestions = [
  {
    id: 1,
    prompt: "What is your name?",
    answer: "King Arthur",
    distractors: ["Sir Lancelot", "Sir Galahad", "Sir Robin"],
  },
  {
    id: 2,
    prompt: "What is your quest?",
    answer: "To seek the Holy Grail",
    distractors: ["Fame", "Fortune", "Love"],
  },
  {
    id: 3,
    prompt: "What is the air-speed velocity of an unladen swallow?",
    answer: "What do you mean? An African or European swallow?",
    distractors: ["24mph", "12mph", "18mph"],
  },
];
/*
We could load our questions into states

const [ questions, setQuestions ] = useState(quizQuestions)
const quizTemplate = questions.map(question => {
  
})
*/

function App() {
  const [questions, setQuestions] = useState(quizQuestions);
  const quizTemplate = questions.map((question) => {
    return {
      ...question,
      options: shuffle([...question.distractors, question.answer]),
      response: "",
      isAnswered: false,
      isCorrect: false,
    };
  }); // Derived State
  const [quiz, setQuiz] = useState(quizTemplate); // ANYTHING ELSE MUST LIVE IN THIS COMPONENT
  const isFinished = quiz
    .map((question) => question.isAnswered)
    .every((x) => x);
  const noCorrect = quiz
    .map((question) => question.isCorrect)
    .filter((x) => x).length;
  const answerQuestion = (id, response) => {
    const currentQuestion = quiz.find((question) => question.id === id);
    const isCorrect = currentQuestion.answer === response;

    const newQuiz = quiz.map((question) => {
      return question.id === currentQuestion.id
        ? {
            ...question,
            isCorrect,
            isAnswered: true,
          }
        : question;
    });
    setQuiz(newQuiz);
    // Cannot mutate existing value
  };

  return (
    <div className="App">
      <h1>Quiz!</h1>
      {!isFinished ? (
        quiz.map((question) => (
          <MultipleChoiceQuestion
            key={question.id}
            question={question}
            respond={answerQuestion}
          />
        ))
      ) : (
        <p>You've finished! You got {noCorrect} right!</p>
      )}
    </div>
  );
}

export default App;
