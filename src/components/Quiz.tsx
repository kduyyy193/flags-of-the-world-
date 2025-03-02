"use client";
import { useState, useEffect } from "react";
import flags, { Flag } from "../data/flags";
import Image from "next/image";

type QuizProps = {
  totalQuestions?: number;
  continent?: string;
};

const getRandomIndex = (max: number): number => Math.floor(Math.random() * max);

const Quiz: React.FC<QuizProps> = ({
  totalQuestions = 10,
  continent = null,
}) => {
  const [questions, setQuestions] = useState<Flag[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const filteredFlags = continent
      ? flags.filter((flag) => flag.continent === continent)
      : flags;

    // Randomize questions
    const selectedQuestions: Flag[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      const randomIndex = getRandomIndex(filteredFlags.length);
      selectedQuestions.push(filteredFlags[randomIndex]);
    }

    setQuestions(selectedQuestions);
  }, [continent, totalQuestions]);

  const handleAnswer = (answer: string) => {
    setShowAnswer(true);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer(answer);
    }

    // Delay for 0.5 seconds before moving to the next question
    setTimeout(() => {
      setShowAnswer(false);
      setSelectedAnswer(null);
      setCurrentQuestionIndex((prev) => (prev + 1) % totalQuestions);
    }, 500);
  };

  useEffect(() => {
    if (questions.length > 0) {
      setCorrectAnswer(questions[currentQuestionIndex].name);
    }
  }, [questions, currentQuestionIndex]);

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  const answerOptions = [
    currentQuestion.name,
    ...flags
      .filter((f) => f.id !== currentQuestion.id)
      .slice(0, 3)
      .map((f) => f.name),
  ];

  // Shuffle answer options
  answerOptions.sort(() => Math.random() - 0.5);

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <div>
        <Image
          src={`/images/${currentQuestion.img}`.toString()}
          alt={currentQuestion.name}
          width={200}
          height={150}
        />
      </div>
      <div>
        <h3>Which country&apos;s flag is this?</h3>
        <div>
          {answerOptions.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(answer)}
              style={{
                backgroundColor: showAnswer
                  ? answer === selectedAnswer
                    ? answer === correctAnswer
                      ? "green"
                      : "red"
                    : ""
                  : "",
              }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
